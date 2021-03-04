const request = require('@derhuerst/gemini/client.js');

const defaultOpts = {
    followRedirects: true,
    verifyAlpnId: () => true,
    connectTimeout: 10 * 1000,
    tlsOpt: {
        rejectUnauthorized: false
    }
}

function gemfetch(url) {
    return new Promise((resolve, reject) => {
        request(url, defaultOpts, (err, res) => {
            if(err) {
                // TODO Handle error gracefully
                reject(err);
                return;
            }

            let doc = '';

            res.on('data', chunk => {
                doc += chunk;
            })

            res.once("end", () => {
                resolve(doc);
            })
        })
    })
}

module.exports = gemfetch;
