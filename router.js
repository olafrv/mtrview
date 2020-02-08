const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Reader = require('@maxmind/geoip2-node').Reader;
const sha1 = require('sha1');

const MAXMIND_GEOLITE_DB='GeoLite2-ASN.mmdb';

class Router {

    constructor() {
        this.hosts = [];
        this.routes = {};
        const options = {};
        this.reader;
        Reader.open(MAXMIND_GEOLITE_DB, options).then(reader => {
            this.reader = reader;
        }).catch((error)=>{
            console.log(error);
        });
        setInterval(this.mtrAll, 1000, this);
    }

    addHosts(hosts){
        hosts.forEach((host,i) => {
            this.addHost(host);
        });
    }

    addHost(hostname){
        this.hosts.push(hostname);
        this.routes[hostname] = {};
    }

    mtrAll(self){
        self.hosts.forEach((hostname) => {
            self.mtr(hostname)
            .then(() => {
              var route = self.getRoute(hostname)
            }).catch((error) => {
              console.log(error);
            });
        });
    }
   
    getRoute(hostname){
        return this.routes[hostname];
    }

    getRouteAll(){ 
        return this.routes;
    }

    addRoute (hostname, hops) {
        const now = Date.now();
        const hash = sha1(hops);
        const splittedHops = hops.split(' ');        
        if (!this.routes[hostname][hash]){
            this.routes[hostname][hash] = { 
                "created" : now,
                "updated" : now,
                "packets" : 0, 
                "hopsCount" : splittedHops.length,
                "hopsRaw" : hops,
                "hops" : {} 
            };
        }
        this.routes[hostname][hash]['updated'] = now;
        this.routes[hostname][hash]['packets']++;
        splittedHops.forEach((ip, i) => {
            if (!this.routes[hostname][hash]["hops"]) this.routes[hostname][hash]["hops"] = {};
            if (!this.routes[hostname][hash]["hops"][i])
            {
                this.routes[hostname][hash]["hops"][i] = {
                    "ip": ip,
                    "asn": this.getAsn(ip)
                };
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
                    self.addRoute(hostname, stdout);
                    console.debug(hostname + " - " + stdout)
                    resolve();
                }
            });
        });
    }
    getAsn(ip){
        var asn;
        try{ asn = this.reader.asn(ip); }catch{};
        return asn ? (asn.autonomousSystemNumber + "_" + asn.autonomousSystemOrganization.replace(/\s/g,'_')) : 'Unknown';
    }
}

module.exports = Router;