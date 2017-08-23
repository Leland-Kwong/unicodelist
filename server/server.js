const { parse } = require('url');
const path = require('path');
const express = require('express');
const next = require('next');
// const LRUCache = require('lru-cache');
const bodyParser = require('body-parser');
const { promisify } = require('util');
const fs = require('fs');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
// const ssrCache = new LRUCache({
//   max: 100,
//   maxAge: 1000 * 60 * 60 // 1hour
// });
//
// /*
//  * NB: make sure to modify this to take into account anything that should trigger
//  * an immediate page change (e.g a locale stored in req.session)
//  */
// function getCacheKey (req) {
//   return `${req.url}`;
// }
//
// function renderAndCache (req, res, pagePath, queryParams) {
//   const key = getCacheKey(req);
//
//   // If we have a page in the cache, let's serve it
//   if (!dev && ssrCache.has(key)) {
//     console.log(`CACHE HIT: ${key}`);
//     res.send(ssrCache.get(key));
//     return;
//   }
//
//   // If not let's render the page into HTML
//   app.renderToHTML(req, res, pagePath, queryParams)
//     .then((html) => {
//       // Let's cache this page
//       console.log(`CACHE MISS: ${key}`);
//       ssrCache.set(key, html);
//
//       res.send(html);
//     })
//     .catch((err) => {
//       app.renderError(err, req, res, pagePath, queryParams);
//     });
// }

function wwwRedirect(req, res, next) {
  if (req.headers.host.slice(0, 4) === 'www.') {
    const newHost = req.headers.host.slice(4);
    return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
  }
  next();
}

function startApp() {
  const server = express();
  server.use(wwwRedirect);
  server.use(compression({
    filter: (req) => {
      const isImage = path.extname(req.path).match(/jpg|tiff|bmp|gif|ico|png/);
      if (isImage) {
        return false;
      }
      return true;
    }
  }));
  server.use(bodyParser.json()); // for parsing application/json
  server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  // Use the `renderAndCache` utility to serve pages
  // server.get('/', (req, res) => {
  //   console.log({ path: req.path });
  //   renderAndCache(req, res, '/', req.query);
  // });

  const getFn = (req, res, query, params) => {
    const reqQuery = Object.assign({ query: '', page: 0 }, query);
    const { page } = reqQuery;
    // adjust human friendly page to actual programmatic page index
    reqQuery.page = (page > 0) ? page - 1 : page;
    reqQuery.page = isNaN(reqQuery.page) ? 0 : reqQuery.page;
    const queryToSend = { query: reqQuery.query, filterBy: 'all', page: reqQuery.page, view: 'list', detail: {} };
    for (const key in params) {
      const val = params[key];
      if (typeof val !== 'undefined') {
        queryToSend[key] = val;
      }
    }
    app.render(req, res, '/', queryToSend);
  };

  const googleSearchVerificationFile = 'google6f87e86940b3fcab.html';
  server.get(`/${googleSearchVerificationFile}`, async (req, res) => {
    const content = await promisify(fs.readFile)(`./${googleSearchVerificationFile}`, 'utf-8')
      .catch(err => err);
    res.send(content);
  });

  server.get([
    '/detail',
    '/detail/:detail'
  ], (req, res) => {
    getFn(req, res, req.query, { view: 'detail', detail: req.params.detail });
  });

  server.get([
    '/',
    '/list',
    '/list/:filterBy',
  ], (req, res) => {
    getFn(req, res, req.query, { view: 'list', filterBy: req.params.filterBy });
  });

  server.get('*', (req, res) => {
    if (req.headers.host.match(/^www/) !== null ) {
      res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
    }

    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
}
app.prepare().then(startApp);
