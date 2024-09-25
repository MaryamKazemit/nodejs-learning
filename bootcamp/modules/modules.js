// wrapper functions
// biome-ignore lint/style/noArguments: <explanation>
console.log(arguments);
console.log(require("node:module").wrapper);

// module.exports
const C1 = require("./test-module-1");
const calc1 = new C1();
console.log(calc1.add(2, 5));
// exports short hand
const calc2 = require("./test-module-2");
const { add, multiply } = require("./test-module-2");
console.log(calc2.multiply(2, 5));
console.log(add(2, 5));
console.log(multiply(2, 5));
// caching
// () call it exactly after returning function
require("./test-module-3")();
// from here it will cacghe and no longer will cal the entire module
require("./test-module-3")();
require("./test-module-3")();
