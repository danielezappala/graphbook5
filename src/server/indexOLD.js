
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import servicesLoader from './services';
import db from './database';

import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import App from '../client/App';
import theme from '../client/theme';

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ThemeProvider>
    ),
  );
   // Grab the CSS from the sheets.
   const css = sheets.toString();
      
   // Send the rendered page back to the client.
   res.send(renderFullPage(html, css));
 }

  function renderFullPage(html, css) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My page</title>
          <style id="jss-server-side">${css}</style>
        </head>
        <body>
          <div id="root">${html}</div>
        </body>
      </html>
    `;
  }

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

// This is fired every time the server-side receives a request.

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

app.get('**', handleRender);

app.listen(8000, () => {
  console.log('Listening on port 8000!')
});