const glob = require('glob');

console.log(glob.sync('*.js'));
console.log(glob.sync('samples/*'));
console.log(glob.sync('samples/?.md'));
console.log(glob.sync('samples/**'));
console.log(glob.sync('samples/**/sample.md'));
console.log(glob.sync('samples/**/*.md'));
console.log(glob.sync('*.{js,md}'));
console.log(glob.sync('samples/!(*.js)'));
