//#!/usr/bin/env node
//desc: 分析指定目录下的文件,生成需要的数据
import {readFileSync} from 'fs'
import fs from 'fs'
import {join,relative,extname, basename} from 'path'
import {ensureDirSync} from 'fs-extra'
import yamlFront from "yaml-front-matter";
import glob from 'glob';


// 递归事件目录
// 路过

//const search_dir = process.argv[2] || process.cwd()
const search_dir = '/home/rainboy/mycode/RainboyDefault/blogData'
const output_prefix = 'dist'

const ignores = ['node_modules/','bin/','dist/','public/']

//得到了所有符合条件的一级目录
let re = glob.glob.sync("*/",{ignore:ignores,cwd:search_dir})

function Glob_md(path) {
    return glob.glob.sync("*.md",{ignore:ignores,cwd:path})
}
function Glob_dir(path) {
    return glob.glob.sync("*/",{ignore:ignores,cwd:path})
}


// 返回值 bool 
// if 返回 true ,则说明返回无内容
function work(path,title,object = {}) {

    object.title = filename_remove_ext(title)
    console.log( path )

    let md_files = Glob_md(path);
    if( md_files.length ) object.children = []
    for( let md_file of md_files) {
        let a = {}
        do_for_one_md_file(path, md_file,a);
        object.children.push(a);
    }

    let dirs = Glob_dir(path)
    if(dirs.length)
        if(!object.children ) object.children = [];
    else return true; //没有内容

    for( let dir of dirs){
        let new_path = join(path,dir);
        let a = {}
        let bret = work(new_path,dir,a)
        if( bret == false)
            object.children.push(a)
    }
    return !object.children
}

function filename_remove_ext(filename){
    if( /\/$/.test(filename))
        filename = filename.replace(/\/$/,'')
    return filename.replace( extname(filename),'')
}

//
function do_for_one_md_file(path,filename,object = {}) {
    let absolute_file_path = join(path,filename)
    let relative_file_path = relative(search_dir,absolute_file_path)
    let out_path = join(search_dir,output_prefix,basename(relative_file_path))
    let relative_out_path = relative(search_dir,out_path)

    //1. read file content
    let content = fs.readFileSync(absolute_file_path,{encoding:'utf8'})

    //2. get front yaml
    let yaml = yamlFront.loadFront(content)

    //3. get file info
    object.title =   yaml.title || filename_remove_ext(filename)
    object.path = relative_file_path
    object.out_path = relative_out_path
}



const Analyze = () => {

    let results = []
    //1. bianli dejie gou
    for( let dir of re) {
        let a = {}
        let _path = join(search_dir,dir);
        work(_path ,dir,a)
        results.push(a)
    }

    // let json_result = JSON.stringify(results,null,4)
    // fs.writeFileSync(join(output_prefix,'data.json'), json_result,{encoding:'utf8'})
    return results
}

export default Analyze