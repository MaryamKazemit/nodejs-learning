console.log('hello world!')
console.log(global)
setTimeout(() => {
    console.log('nodejs timeout')
}, 500);
// the same as prev
// global.setTimeout(() => {
//     console.log('nodejs timeout')
// }, 500);
// global and globalThis are the same
console.log(globalThis)

// const myString=require("./commonjs-module")
// console.log(myString)

// destructure
// const {add,subTrack,myName}=require("./commonjs-module")
// const commonjsModule=require("./commonjs-module")
// console.log(add(2,5),subTrack(5,3),myName)

import str,{add,subTrack} from "./es-module.js"
console.log(add(2,5),subTrack(5,3),str)