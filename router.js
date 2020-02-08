const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Reader = require('@maxmind/geoip2-node').Reader;
const sha1 = require('sha1');
const _ = require('lodash'); 

const MAXMIND_GEOLITE_DB='GeoLite2-ASN.mmdb';
const DEFAULT_MTR_OPTIONS='-n -l -c 1 -4'; // udp

class Router {

    constructor(config) {
        this.config = config;
        this.routes = {};
        this.reader;
        Reader.open(MAXMIND_GEOLITE_DB, {}).then(reader => {
            this.reader = reader;
        }).catch((error)=>{
            console.log(error);
        });
        setInterval(this.mtrAll, 1000, this);
    }

    addRoute (hostname, hops) {
        let now = Date.now();
        let hopsUniq = _.uniq(hops.split(' '));
        this.getRouteHash(hostname, hopsUniq)
        .then((hash) => {
            hash = hash ? hash : sha1(hopsUniq.join(' '));
            if (!this.routes[hostname]) this.routes[hostname] = {};
            if (!this.routes[hostname][hash]){
                this.routes[hostname][hash] = { 
                    "mtrOptions" : this.getHostMtrOptions(hostname),
                    "created" : now,
                    "updated" : now,
                    "packets" : 0, 
                    "hash" : hash,
                    "hopsNum" : hopsUniq.length,
                    "hopsRaw" : hops,
                    "hopsUniq" : hopsUniq,
                    "hops" : {} 
                };
            }
            this.routes[hostname][hash]['updated'] = now;
            this.routes[hostname][hash]['packets']++;
            hopsUniq.forEach((ip, i) => {
                this.routes[hostname][hash]["hops"][i] = {
                    "ip": ip,
                    "asn": this.getAsn(ip)
                }
            });
        });
    }

    getAsn(ip){
        let asn;
        try{ asn = this.reader.asn(ip); }catch{};
        return asn ? (asn.autonomousSystemNumber + "_" + asn.autonomousSystemOrganization.replace(/\s/g,'_')) : 'Unknown';
    }   

    getRoutes(hostname){
        return this.routes[hostname];
    }

    getRouteHash(hostname, hopsUniq){
        let routes = this.getRoutes(hostname);
        return new Promise((resolve) => {
            for (var hash in routes){
                var isSubRoute = (_.intersection(routes[hash].hopsUniq, hopsUniq).length == hopsUniq.length); 
                if (isSubRoute) resolve(hash);
            }
            resolve(false);
        });
    }

    getHostMtrOptions(hostname){
        let hostMtrOption = this.config.hosts[hostname];
        return !_.isEmpty(hostMtrOption) ? this.config.mtrOptions[hostMtrOption] : DEFAULT_MTR_OPTIONS;
    }

    mtr (hostname) {
        return new Promise((resolve, reject) => {
            let mtrOptions = this.getHostMtrOptions(hostname);
            let cmd = `mtr ${mtrOptions} ${hostname} | grep ^h | cut -d\" \" -f3 | xargs echo -n`;
            exec(cmd, (error, stdout, stderr) => {
                if (error != null){
                    reject(stderr);
                }else{
                    resolve(stdout);
                }
            });
        });
    }

    mtrAll(self){
        for(let hostname in self.config.hosts){
            self.mtr(hostname)
            .then((hops) => {
                self.addRoute(hostname, hops);
            }).catch((error) => {
              console.log(error);
            });
        };
    }

}

module.exports = Router;