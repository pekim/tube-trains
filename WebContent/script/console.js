// Ensure that use of console.* functions does not break on platforms
// that don't support them.

if (!window.console) console = {};

console.log = console.log || function(){};
console.warn = console.warn || function(){};
console.error = console.error || function(){};
console.info = console.info || function(){};
