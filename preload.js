const fs = require("fs");
const fileUrl = require("file-url");
const { contextBridge } = require("electron");
const fetch = require("./lib/fetch");
const parse = require("./lib/parser");


async function getPage(url) {
    let doc;

    if(fs.existsSync(url)) {
        doc = fs.readFileSync(fileUrl(url), { encoding: "utf-8" });
    } else if (url.startsWith("gemini://")) {
        // TODO assume the protocol is "gemini://"
        doc = await fetch(url);
    } else {
        // TODO handle gracefully (display as plain-text?)
        throw new Error(`protocol not supported`)
    }

    const ast = parse(doc);
    return ast;
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

contextBridge.exposeInMainWorld("gemium", {
    getPage: getPage,
    // history: {},
});
