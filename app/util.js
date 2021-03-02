const fs = require("fs");
const fileUrl = require("file-url");
const gemfetch = require("./fetch");

async function fetchUrl(url="") {
    if(fs.existsSync(url)) {
        return fs.readFileSync(fileUrl(url), { encoding: "utf-8" });
    } else if (url.startsWith("gemini://")) {
        console.log(url.split("://"))
        return await gemfetch(url);
    } else {
        // TODO handle gracefully (display as plain-text?)
        throw new Error(`protocol "${protocol}" not supported`)
    }
}

module.exports = { fetchUrl }
