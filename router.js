const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Reader = require('@maxmind/geoip2-node').Reader;
const MAXMIND_GEOLITE_DB='GeoLite2-ASN.mmdb';

class Router {

    constructor() {
        this.hosts = [];
        this.routes = {};
        this.reader;
        const options = {};
        Reader.open(MAXMIND_GEOLITE_DB, options).then(reader => {
            this.reader = reader;
        }).catch((error)=>{
            console.log(error);
        });
        setInterval(this.mtrAll, 1000, this);
    }

    setHosts(hosts){
        this.hosts = hosts;
    }

    addHost(hostname){
        this.hosts.push(hostname);
    }

    mtrAll(self){
        self.hosts.forEach((hostname) => {
            self.mtr(hostname)
            .then((resolved) => {
              console.log(self.getRoute(hostname));
            }).catch((rejected) => {
              console.log(rejected);
            });
        });
    }
   
    getRoute(hostname){
        return this.routes[hostname];
    }
    getRouteAll(){ 
        return this.routes;
    }

    addRoute (route) {
        var [host, hops] = route.split(':');
        var hops = hops.split(' ');
        if (!this.routes[host]) this.routes[host] = {};
        hops.forEach((ip, hop) => {
            if (!this.routes[host][hop]) this.routes[host][hop] = {};
            if (!this.routes[host][hop][ip]){
                this.routes[host][hop][ip] = {};
                this.routes[host][hop][ip]['asn']= this.getAsn(ip);
                this.routes[host][hop][ip]['pkt']= 1;
            }else{
                this.routes[host][hop][ip]['pkt']++;
            }
        });
    }

    mtr (hostname) {
        var self = this;
        return new Promise((resolve, reject) => {
            const cmd = `mtr -n --raw ${hostname} -c 1 -4 | grep ^h | cut -d\" \" -f3 | xargs echo -n`;
            exec(cmd, (error, stdout, stderr) => {
                if (error != null){
                    reject(stderr);
                }else{
                    const route = hostname + ":" + stdout;
                    self.addRoute(route);
                    resolve(route);
                }
            });
        });
    }
    getAsn(ip){
        var asn;
        try{ asn = this.reader.asn(ip); }catch{};
        return asn ? (asn.autonomousSystemNumber + "_" + asn.autonomousSystemOrganization.replace(/\s/g,'_')) : '';
    }
}

module.exports = Router;