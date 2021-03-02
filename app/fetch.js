const request = require('@derhuerst/gemini/client.js');

const defaultOpts = {
    followRedirects: true,
    verifyAlpnId: () => true,
    tlsOpt: {
        rejectUnauthorized: false
    }
}

function gemfetch(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("request timed out")
        }, 5000)

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
