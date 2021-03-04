const fs = require("fs");
const fileUrl = require("file-url");
const fetch = require("./lib/fetch");
const parse = require("./lib/parser");
const render = require("./lib/render");

contextBridge.exposeInMainWorld("gemium", {
    foo: "bar"
});

async function load(url) {
    let doc;

    if(fs.existsSync(url)) {
        doc = fs.readFileSync(fileUrl(url), { encoding: "utf-8" });
    } else if (url.startsWith("gemini://")) {
        doc = await fetch(url);
    } else {
        // TODO handle gracefully (display as plain-text?)
        throw new Error(`protocol not supported`)
    }

    const ast = parse(doc);
    render(ast);
}

function goBack() {
    console.log("Going back...")
}

function goForward() {
    console.log("Going forward...")
}

function refresh() {
    console.log("Refreshing page...")
}
module.exports = {
    load,
    goBack,
    goForward,
    refresh
}
