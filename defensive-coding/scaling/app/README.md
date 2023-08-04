

## setup process

```
npm i -D lavamoat patch-package
npx lavamoat --autopolicy index.js
npx lavamoat index.js
# error :(
# fix `main` field in package.json of tiny-lru
npx patch-package tiny-lru
# nothing happened
npx patch-package tiny-lru --exclude 'nothing'
# now we're talking
```