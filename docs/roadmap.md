# Roadmap

This document details the current plan for Gemium. It should give you an idea of what's in store, and also what tasks need to be completed.

Thanks goes to [this article by mozilla about roadmapping](https://mozilla.github.io/open-leadership-training-series/articles/opening-your-project/start-your-project-roadmap/#prototyping).

Note: Visible elements, such as buttons and indicators, must be functional. For every milestone.

## Current milestone (0.2.0)
**Due**: May 1, 2021

**Requirements**

1. show error messages in UI
2. UI for pages which can't load properly (eg. unsupported content-type)
3. assume protocol is "gemini://"
4. bug: on-page links don't update the address bar
5. bug: on-page links don't load into browser history

## Upcoming Milestone (0.3.0)
**Due**: June 1, 2021

**Requirements**: TBD

## Backlog
> Miscellaneous tasks which haven't yet been assigned a milestone.

- differentiate between link types (and add CSS classes)
  - external vs. internal
  - document vs. tel/mailto
  - gemtext vs. xml vs. http/other
- addressbar should show suggestions based on browser history
- Verify SSL Certificate
- Solidify "new tab page" content
- bug: local ("file" protocol) gemtext does not render as html
- UI for displaying multiple pages as tabs
- App should pass the gemini client torture test (<gemini://gemini.conman.org/test/torture/>)
