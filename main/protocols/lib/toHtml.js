/**
 *
 * @param {import("./tokenize").Token} token
 * @returns {string} HTML string
 */
function createNode(token) {
    // TODO Should we `escape()` the text, for security, in case the gemtext
    // includes unsafe HTML?
    let element;
    switch (token.type) {
        case 'heading_1':
            element = `<h1>${token.value}</h1>`;
            break;
        case 'heading_2':
            element = `<h2>${token.value}</h2>`;
            break;
        case 'heading_3':
            element = `<h3>${token.value}</h3>`;
            break;
        case 'break':
            element = "<br/>"
            break;
        case 'pre':
            element = `<pre>${token.value}</pre>`
            break;
        case 'text':
            element = `<p>${token.value}</p>`
            break;
        case 'link':
            let rel = "";

            if(/^https?:\/\//.test(token.value)) {
                rel = `rel="noopener noreferrer"`;
            }

            // TODO add classes for different types of links
            // TODO mark external links
            const a =  `<a ${rel} href="${token.url}">${token.value}</a>`

            element = `<p>${a}</p>`
            break;
        case 'quote':
            element = `<blockquote>${token.value}</blockquote>`;
            break;
        case 'list':
            const listitems = [];
            for(const c of token.children) {
                listitems.push(`<li>${c.value}</li>`);
            }
            element = `<ul>${listitems.join("")}</ul>`;
            break;
        default:
            throw new Error(`Received unknown token type: "${token.type}"`);
    }

    return element;
}

/**
 *
 * @param {import("./tokenize").Token[]} tokens
 * @returns {string} HTML string
 */
function toHtml(tokens) {
    const body = tokens.map(t => createNode(t)).join("");

    const { app } = require("electron");
    const {readFileSync, existsSync} = require("fs");
    const {join} = require("path");

    let css;
    if(existsSync(join(app.getPath("userData"), "custom.css"))) {
        css = readFileSync(join(app.getPath("userData"), "custom.css"), "utf-8");
    } else {
        css = readFileSync(join(__dirname, "default-styles.css"), "utf-8");
    }

    // TODO move html template to separate file (?)
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    ${css}
    </style>
</head>
<body><article>${body}</article></body>
</html>`
}

module.exports = toHtml;
