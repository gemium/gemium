const request = require('@derhuerst/gemini/client.js');

const defaultOpts = {
    followRedirects: true,
    verifyAlpnId: () => true,
    tlsOpt: {
        rejectUnauthorized: false
    }
}

function gemfetch() {
    return new Promise((resolve, reject) => {

        request(url, defaultOpts, (err, res) => {
            if(err) {
                // TODO Handle error gracefully
                reject(err);
            }

            res.once("readable", () => {
                const doc = String(res.read());
                resolve(doc);
            })
        })
    })
}


module.exports = gemfetch;
