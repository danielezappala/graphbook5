
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import servicesLoader from './services';
import db from './database';

import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheets, CssBaseline, ThemeProvider } from '@material-ui/core/styles';
import App from '../client/App';
import theme from '../client/theme';



const app = express();
const root = path.join(__dirname, '../../');
console.log('root ' + root)
console.log('dirname '+ __dirname)
app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));


const utils = {
  db,
};

const services = servicesLoader(utils);


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

app.get('**', (req, res) => {
  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  console.log('context ' + context)
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme} >
      <CssBaseline />
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ThemeProvider>
    ),
  );

  const context = {};
  const meta = `<title>Hello this is meta</title> `
   // Grab the CSS from the sheets.
   const css = sheets.toString();
    // Send the rendered page back to the client.
   const renderedData = renderFullPage(meta,html, css)
   return res.send(renderedData)
      


  function renderFullPage(meta, html, css) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        ${meta}
            <style id="jss-server-side">
         ${css}
         body {
          margin: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
         }
        </style>
          </head>
          <body>
            <div id="root">${html}</div>
        <script src="/bundle.js"></script>
          </body>
        </html>
    `;
  }

})

app.listen(8000, () => {
  console.log('Listening on port 8000!')
});