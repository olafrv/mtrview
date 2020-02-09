### Installation

**NOTE:** This steps are tested on [Ubuntu 16.04 LTS](http://releases.ubuntu.com/16.04/).

Install nodejs following the [official manual](https://github.com/nodesource/distributions/blob/master/README.md).

Install [nodemon](https://www.npmjs.com/package/nodemon) globally as root user:
```
sudo npm install -g nodemon
sudo apt install mtr
```

Update nodejs modules:
```
npm update
```

Edit configuration file (i.e. server, port, hosts, etc.):
```
config.json
```

Run the mtrview api server (DEBUG logging):
```
ENV=DEBUG nodemon api.js
```

Run the mtrview api server in production:
```
nodejs api.js
```

Visite the api endpoint (JSON):
```
http://<server>:<port>/?hostname=<host>
```

### References
* [man mtr](https://linux.die.net/man/8/mtr)