# Roadmap

This document details the current plan for Gemium. It should give you an idea of what's in store, and also what tasks need to be completed.

Thanks goes to [this article by mozilla about roadmapping](https://mozilla.github.io/open-leadership-training-series/articles/opening-your-project/start-your-project-roadmap/#prototyping).


## Current Milestone
**Due**: April 2021

**Summary**

Create an MVP ("Minimum Viable Product"). "The MVP is a stripped down but functional version of your project that’s ready for use" ([source](https://mozilla.github.io/open-leadership-training-series/articles/opening-your-project/start-your-project-roadmap/#prototyping)).

Note: Visible elements, such as buttons and indicators, must be functional.

**Requirements**

1. ~~Browser navigation via toolbar (address, back button, forward button)~~
2. Open gemini links in-app
3. ~~Refresh button should work~~
4. Allow customizing the CSS
5. implement ssl, or hide indicator


## Pre-release (WIP)
**Due**: May 2021 (?)

**Summary**

TBD

**Requirements**

1. App should pass the gemini client torture test (<gemini://gemini.conman.org/test/torture/>)


## Backlog
> Miscellaneous tasks which haven't yet been assigned a milestone.

- assume protocol is "gemini://"
- show error messages in UI
- UI for pages which can't load properly
  - eg. unsupported content-type
- differentiate between link types (and add CSS classes)
  - external vs. internal
  - document vs. tel/mailto
  - gemtext vs. xml vs. http/other
- addressbar should show suggestions based on browser history
- Verify SSL Certificate
- Solidify "new tab page" content
