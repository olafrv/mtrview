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
npm run test
```

Run the mtrview api server in production:
```
npm run serve
```

Visit the mtrview api endpoint (JSON):
```
http://<server>:<port>/?hostname=<host>
```

### References

* [man mtr](https://linux.die.net/man/8/mtr)
* [Internet Routing and Traffic Engineering](https://aws.amazon.com/blogs/architecture/internet-routing-and-traffic-engineering/)
* [A Practical Guide to (Correctly) Troubleshooting with Traceroute](https://archive.nanog.org/meetings/nanog45/presentations/Sunday/RAS_traceroute_N45.pdf)