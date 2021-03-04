/**
 * @typedef Token
 * @property {string} type One of: break, heading[123], link, list, listitem, pre, quote, text
 * @property {string} [value] Text value of token. Empty for "list" and "break"
 * @property {string} [url] Only for "link"
 * @property {string} [alt] Only for pre. Optional alt text
 * @property { { type: "listitem", value: string } } [children] Only for "list"
 */

/**
 * Gemtext lexer
 * @param {string} doc raw gemtext for parsing
 * @returns {Token[]} array of token objects
 */
function parse(doc) {
    /**
     * Pseudocode:
     * Split doc by lines
     * For each line, discern token type
     *
     * Considerations:
     * Lists and pre are multi-line
     *
     */

    const lines = doc.split(/\r?\n/m).map(d => d.trim());
    let tokens = [];

    let modeIsPre = false;
    let preText = [];
    let preAlt = "";

    for(let ln of lines) {
        // Toggle pre-mode
        if(ln.startsWith("```")) {
            modeIsPre = !modeIsPre;

            // toggle-related actions
            if(modeIsPre)  {
                preAlt = ln.substring(3);
                ln = ln.replace(/^`{3}\s*/, "")
            } else {
                tokens.push({type: "pre", value: preText.join("\n"), alt: preAlt})
                preText = [];
            }
            continue;
        }

        if(modeIsPre) {
            // Pre blocks
            preText.push(ln);
        } else if(ln === "") {
            // Line break
            tokens.push({type: "break"})
        } else if (/^\#{1,3}/.test(ln)) {
            // Headings (1,2,3)
            const {prefix, value} = ln.match(/(?<prefix>^\#{1,3})(?<value>.*)/).groups;
            tokens.push({
                type: "heading_" + prefix.length,
                value
            });
        } else if (/^\=\>/.test(ln)) {
            // Links
            const re = /^\=\>\s*(?<url>[^\s]+)\s*(?<value>.+)?$/;
            const {url, value} = ln.match(re).groups;
            tokens.push({type: "link", url, value})
        } else if (ln.startsWith("* ")) {
            // Lists
            if(tokens[tokens.length - 1] && tokens[tokens.length - 1].type !== "list") {
                tokens.push({type: "list", children: []})
            }

            tokens[tokens.length - 1].children.push({
                type: "listitem", value: ln.replace(/^\*\s/, "")
            })
        } else if (ln.startsWith(">")) {
            // Quotes
            tokens.push({ type: "quote", value: ln.substring(1).trim() })
        } else {
            // Text (plain)
            tokens.push({ type: "text",  value: ln })
        }
    }

    return tokens;
}

module.exports = parse;
