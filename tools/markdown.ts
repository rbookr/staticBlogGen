//markdown 渲染
import MarkdownIt from "markdown-it";
import myAxios from "./myAxios";

import anchor from "markdown-it-anchor";
import kbdplugin from "markdown-it-kbd";
import attrs from "markdown-it-attrs";
import emoji from 'markdown-it-emoji';
import toc from "markdown-it-toc-done-right";
import mathjax3 from "markdown-it-mathjax3"

var re = new MarkdownIt()
console.log( re.render('# hel') )

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
