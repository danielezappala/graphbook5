import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import Resolvers from './resolvers';
import Schema from './schema'; 
import auth from './auth';
import JWT from 'jsonwebtoken';
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

export default (utils) => {
  // console.log('utils ')
  console.log('initializing graphql server')
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(utils),
    schemaDirectives: {
      auth: auth
    },
  });
  var cont = 0
  const server = new ApolloServer({
    schema: executableSchema,
    context: async ({ req }) => {
      console.log(req.headers.authorization)
      const authorization = req.headers.authorization;
      console.log('authorization ',authorization)
      if(typeof authorization !== typeof undefined) {
        var search = "Bearer";
        var regEx = new RegExp(search, "ig");
        const token = authorization.replace(regEx, '').trim();
        console.log('token ',token)
        console.log('SECRET ',JWT_SECRET)
        return JWT.verify(token, JWT_SECRET, function(err, result) {
          console.log('err ',err)
          console.log('result ',result)
          if(err) {
            return req;
          } else {
            return utils.db.models.User.findByPk(result.id).then((user) => {
              return Object.assign({}, req, { user });
            });
          }
        });
      } else {
        return req;
      }
    },
  });
  return server;
};