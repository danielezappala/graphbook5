require('dotenv').config();
import logger from'../../helpers/logger';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const Op = Sequelize.Op;
const JWT_SECRET  = process.env.JWT_SECRET;
console.log('JWT_SECRET '+JWT_SECRET)

export default function resolver() {
    const { db } = this;
    const { User } = db.models;

    const resolvers = {
        
        RootQuery: {
            currentUser(root, args, context) {
                console.log('current user context ',context.user)
                return context.user;
            }
        },
        RootMutation: {
            
            login(root, { email, password }, context) {
                return User.findAll({
                  where: {
                    email
                  },
                  raw: true
                }).then(async (users) => {
                    if(users.length = 1) {
                        const user = users[0];
                        const passwordValid = await bcrypt.compare(password, user.password);
                        if (!passwordValid) {
                            throw new Error('Password does not match');
                        }
                        const token = JWT.sign({ email, id: user.id }, JWT_SECRET, {
                            expiresIn: '1d'
                        });
                
                        return {
                            token
                        };
                    } else {
                        throw new Error("User not found");
                    }
                });
            },
            signup(root, { email, password, username }, context) {
                return User.findAll({
                  where: {
                    [Op.or]: [{email}, {username}]
                  },
                  raw: true,
                }).then(async (users) => {
                    if(users.length) {
                        throw new Error('User already exists');   
                    } else {
                        return bcrypt.hash(password, 10).then((hash) => {
                            return User.create({
                                email,
                                password: hash,
                                username,
                                activated: 1,
                            }).then((newUser) => {
                                const token = JWT.sign({ email, id: newUser.id }, JWT_SECRET, {
                                    expiresIn: '1d'
                                });
                                return {
                                    token
                                };
                            });
                        });
                    }
                });
            },
        }
    };

    return resolvers;
}