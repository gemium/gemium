// gemini://gemini.circumlunar.space/docs/cheatsheet.gmi
//../mocks/localFile.gmi

if(!window.gemium) throw new Error("Gemium api not loaded");

function createNode(token) {
    let element;
    switch (token.type) {
        case 'heading_1':
            element = document.createElement("h1");
            element.innerText = token.value;
            break;
        case 'heading_2':
            element = document.createElement("h2");
            element.innerText = token.value;
            break;
        case 'heading_3':
            element = document.createElement("h3");
            element.innerText = token.value;
            break;
        case 'break':
            element = document.createElement("br");
            break;
        case 'pre':
            element = document.createElement("pre");
            element.innerText = token.value;
            break;
        case 'text':
            element = document.createElement("p");
            element.innerText = token.value;
            break;
        case 'link':
            // TODO add classes for different types of links
            // TODO mark external links
            element = document.createElement("p");
            let a =  document.createElement("a");
            a.href = token.url;
            a.innerText = token.value;
            if(/^https?:\/\//.test(a.href)) {
                // TODO does the next line do anything?
                a.relList.add("noopener", "noreferrer");
            }

            element.appendChild(a);
            break;
        case 'quote':
            element = document.createElement("blockquote");
            element.innerText = token.value;
            break;
        case 'list':
            element = document.createElement("ul");
            for(const c of token.children) {
                let li = document.createElement("li");
                li.innerText = c.value;
                element.appendChild(li)
            }
            break;
        default:
            throw new Error(`Received unknown token type: "${token.type}"`);
    }

    return element;
}


function renderPage(url) {
    gemium.getPage(url)
    .then(ast => {
        ast.forEach(token => {
            root.appendChild(createNode(token));
        })
    }).catch(err => {
        throw new Error(err);
    })
}
