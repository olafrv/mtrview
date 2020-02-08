const http = require('http');
const url = require('url');
const Router = require('./router.js');
const fs = require('fs');

const hostname = '0.0.0.0';
const port = 8080;

const config = JSON.parse(fs.readFileSync('config/hosts.json'));

var router = new Router();
router.addHosts(config.hosts);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const query = url.parse(req.url,true).query;
  res.statusCode = 200;
  res.end(JSON.stringify(
      {
          "hostname" : query.hostname
        , "routes" : router.getRoute(query.hostname)
      }
  ));
});

server.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}/`);
});
