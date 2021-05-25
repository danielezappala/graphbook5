
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import servicesLoader from './services';
import db from './database';

const utils = {
    db,
};

const services = servicesLoader(utils);
const root = path.join(__dirname, '../../');
console.log('root ' + root)
console.log('dirname '+ __dirname)

const app = express();

app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));


if(process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "*.amazonaws.com"]
        }
    }));
    app.use(compress());
    app.use(cors());
}
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

//app.use(express.json)

const serviceNames = Object.keys(services);
console.log('serviceNames ' + JSON.stringify(serviceNames))
for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i];
  console.log('name: '+name)
  if (name === 'graphql') {
    services[name].applyMiddleware({ app });
  } else {
    app.use(`/${name}`, services[name]);
  }
}

app.listen(8000, () => {
  console.log('Listening on port 8000!')
});