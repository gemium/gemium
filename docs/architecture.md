# Architecture

The codebase can be split into two top-level components. The [main process](#main-process) launches the app using [Electron](https://electronjs.org). It provides a browser environment, so the [renderer process](#renderer-process) can display the interface.

## Main Process
Located in `/index.js` and `/main`

Creates and launches the app. Wrapper around the renderer process.

## Renderer Process
Located within `/renderer`

The HTML and CSS live here, as does any JavaScript directly affecting the DOM.
