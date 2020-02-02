const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
    mtr: (hostname) => {
        return new Promise((resolve, reject) => {
            const cmd = `mtr -n --raw ${hostname} -c 1 -4 | grep ^h | cut -d\" \" -f3 | xargs echo -n`;
            exec(cmd, (error, stdout, stderr) => {
                if (error != null){
                    reject(stderr);
                }else{
                    resolve(hostname + ":" + stdout);
                }
            });
        });
    }
}