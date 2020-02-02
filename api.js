const http = require('http');
const url = require('url');
const Router = require('./router.js');

const hostname = '0.0.0.0';
const port = 8080;
var routes = new Router();

routes.addHost("8.8.8.8");
routes.addHost("westwing.de");

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const query = url.parse(req.url,true).query;
  res.statusCode = 200;
  res.end(JSON.stringify(routes.getRoute(query.hostname)));
});

server.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}/`);
});
