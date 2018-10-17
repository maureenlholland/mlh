# Static personal site

## Known Bugs:
- Wonky stuff happening with sticky header: when switching from `position: relative` to `position: fixed` on scroll, I get a very jumpy animation. Decided to start with `position: absolute` which allows smoother animation to fixed header but creates other positioning problems.
- Screenreader reads out decorative pseudo-element description. 
- `invert` again doing some weird cross-browser stuff. Current version only works on chrome.

## Resolved Bugs:
- `invert` changes positioning when used on body element, see [SO discussion](https://stackoverflow.com/questions/51589185/css-filter-invert-rule-breaking-fixed-position-on-chrome-68). Solved by moving the inverted styles to the document root (`document.documentElement` or `:root`).
- Unable to keep top of modal in view with `overflow: auto` and `align-items: center` on flex parent when screen is smaller than flex child, see [SO discussion](https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container). Solved by changing from `align-items` and `justify-content` on flex parent to `margin: auto` on flex child.