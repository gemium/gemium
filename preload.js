const fs = require("fs");
const fileUrl = require("file-url");
const { contextBridge } = require("electron");

const fetch = require("./lib/fetch");
const parse = require("./lib/parser");
const Pages = require("./lib/pages");

/**
 * Given a local or remote URL,
 * @param {string} url url to fetch
 * @returns {import("./lib/parser").Token[]} Array of token, with which to create the DOM
 */
async function load(url) {
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

const pages = new Pages();

contextBridge.exposeInMainWorld("gemium", {
    loadUrl: load,
    pages: {
        current: () => pages.current,
        toNext: () => pages.toNext(),
        toLast: () => pages.toLast(),
        to: (v) => pages.to(v),
        _stack: () => pages.stack
    }
});
