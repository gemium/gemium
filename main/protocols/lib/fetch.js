const defaultOpts = {
    followRedirects: true,
    verifyAlpnId: () => true,
    connectTimeout: 10 * 1000,
    tlsOpt: {
        rejectUnauthorized: false
    }
}

/**
 * @typedef ResponseObject
 * @property {string} url url fetched
 * @property {object} status
 * @property {number} status.code gemini (not http) status code
 * @property {string} status.message string representation of gemini statusCode
 * @property {object} meta random stuff passed from gemini-fetching module
 * @property {string} body gemtext string
 */

/**
 *
 * @param {string} url url to remote gemini file
 * @returns {Promise<ResponseObject>}
 */
function gemfetch(url) {
    const request = require('@derhuerst/gemini/client.js');

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
                resolve({
                    url: url,
                    status: {
                        code: res.statusCode,
                        msg: res.statusMessage
                    },
                    meta: res.meta,
                    body: doc
                });
            })
        })
    })
}

module.exports = gemfetch;
