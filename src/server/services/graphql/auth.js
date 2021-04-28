import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';

class AuthDirective extends SchemaDirectiveVisitor {
    
    visitFieldDefinition(field) {
        console.log('field ',field)
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function(...args) {
           
            const ctx = args[2];

            // console.log('ctx.user ',ctx.user)
            if (ctx.user) {
                //console.log('ctx.user ',ctx.user);
                return await resolve.apply(this, args);
            } else {
                console.log('error !')
                throw new AuthenticationError("You need to be logged in !.");
            }
        };
    }
}

export default AuthDirective;