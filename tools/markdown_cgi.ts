/* *
 * cgi程序,配合 nginx + fcgiwrap + spwan-cgi 使用
 * 作用: 根据传递过来的env参数,渲染对应的markdown
 * */

//[javascript - How to resolve Node.js ES6 (ESM) Modules with the TypeScript Compiler (TSC). TSC doesn't emit the correct file-ext - Stack Overflow](https://stackoverflow.com/questions/44979976/how-to-resolve-node-js-es6-esm-modules-with-the-typescript-compiler-tsc-tsc)
import {Render} from './markdown.js'

let md_out = Render('#hello')
process.stdout.write(md_out)
