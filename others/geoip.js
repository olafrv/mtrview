const Reader = require('@maxmind/geoip2-node').Reader;
options = {};
Reader.open('geoip.mmdb', options).then(reader => {
    reader.asn("127.0.0.1").then(()=>{}).catch(()=>{});
}).catch(()=>{});

