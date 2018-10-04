# Static personal site

## Known Bugs:

## Resolved Bugs:
- `invert` changes positioning when used on body element, see [SO discussion](https://stackoverflow.com/questions/51589185/css-filter-invert-rule-breaking-fixed-position-on-chrome-68). Solved by moving the inverted styles to the document root (`document.documentElement` or `:root`).