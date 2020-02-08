const http = require('http');
const url = require('url');
const Router = require('./router.js');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json'));

const router = new Router(config);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const query = url.parse(req.url,true).query;
  res.statusCode = 200;
  res.end(JSON.stringify({
          "hostname" : query.hostname
        , "routes" : router.getRoutes(query.hostname)
  }));
});

server.listen(config.server.port, config.server.address, () => {
  console.log("Listening: " + config.server.address + ":" + config.server.port);
});
