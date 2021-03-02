const fs = require("fs");
const gemfetch = require("./fetch");

async function fetchUrl(url) {
    if(url.startsWith("gemini://")) {
        return await gemfetch(url);
    } else if(fs.statSync(url).isFile()) {
        return fs.readFileSync(url, { encoding: "utf-8" });
    } else {
        // TODO handle gracefully (display as plain-text?)
        throw new Error("format not recognized")
    }
}

module.exports = { fetchUrl }
