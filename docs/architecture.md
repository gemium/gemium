# Architecture

The codebase can be split into three top-level components. The [main process](#main-process) launches the app using [Electron](https://electronjs.org). It provides a browser environment, so the [renderer process](#renderer-process) can display the interface. It also runs the [preload script](#preload-script), which defines a gemini-specific API for the renderer's `window` object.

## Main Process
Located in `/index.js`

Creates and launches the app. Wrapper around the renderer process.

## Renderer Process
Located within `/app`

The HTML and CSS live here, as does any JavaScript directly affecting the DOM.

Note that `/app/css/document.css` may move in the future, since the use should be able to edit it directly.

## Preload Script
Located in `/preload.js` and `/lib`

Defines a `window.gemium` API, which provides methods needed to make the toolbar buttons function properly, and a method for rendering a gemini URL.
