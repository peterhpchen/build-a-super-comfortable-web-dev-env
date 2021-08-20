---
to: app/<%= name %>.js
---
const hello = `
Hello <%= name %>!
This is your <%= nth %> hygen template.

Learn what it can do here:

https://github.com/jondot/hygen
`

console.log(hello)
