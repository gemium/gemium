// Reference: https://github.com/beakerbrowser/beaker

const tokenize = require("./lib/tokenize");
const fetch = require("./lib/fetch");
const toHtml = require("./lib/toHtml");

/** @param {import("electron").Protocol} protocol */
function register(protocol) {
    return protocol.registerStringProtocol('gemini', handler);
}

/**
 *
 * @param {import("electron").ProtocolRequest} request
 * @param {(response: string | import("electron").ProtocolResponse) => void} callback
 */
function handler(request, callback) {
    return fetch(request.url)
    .then(response => {
        const tokens = tokenize(response.body);
        const data = toHtml(tokens);

        return callback(data)
    }).catch(err => {
        // TODO prettier error page
        callback({
            statusCode: 400,
            data: `<h1>Failed to load url</h1><pre>${err.toString()}</pre>`
        });
    })
}

module.exports = {register};
