//markdown 渲染
import MarkdownIt from "markdown-it";

//[javascript - How to resolve Node.js ES6 (ESM) Modules with the TypeScript Compiler (TSC). TSC doesn't emit the correct file-ext - Stack Overflow](https://stackoverflow.com/questions/44979976/how-to-resolve-node-js-es6-esm-modules-with-the-typescript-compiler-tsc-tsc)
import myAxios from "./myAxios.js";

import anchor from "markdown-it-anchor";
import kbdplugin from "markdown-it-kbd";
import attrs from "markdown-it-attrs";
import emoji from 'markdown-it-emoji';
import toc from "markdown-it-toc-done-right";
import mathjax3 from "markdown-it-mathjax3"

// var re = new MarkdownIt()
// console.log( re.render('# hel') )

export const createMarkdownRenderer = (options= {},base = '/') => {

    const md = MarkdownIt({
        html :true,
        linkify:true,
        // highlight : options.highlight || 
        ...options
    })

    md.use(anchor, {})
    .use(attrs)
    .use(toc,{level:[2,3]})
    .use(emoji)
    .use(kbdplugin)
    .use(mathjax3)

    return md
}

//默认的markdown
export const __MD = createMarkdownRenderer();

export const Render = ( md_text:string ):string => {
    return __MD.render(md_text)
}


const rFrontMatter = /^(-{3,}|;{3,})[\n,\r]{1,2}([\s\S]+?)[\n,\r]{1,2}\1(?:$|[\n,\r]{1,2}([\s\S]*)$)/;
export const fetch_md = async (src : string) => {
    return myAxios({
        url: src,
        method: 'get',
    }).then( ({data}) => {
        console.log("1---")
        console.log(data)

        if( rFrontMatter.test(data)) {
            let match = data.match(rFrontMatter);
            return __MD.render( match[3] || '')
        }
        return __MD.render( data  )
    })
}
