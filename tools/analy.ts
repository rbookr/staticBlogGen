//#!/usr/bin/env node
//desc: 分析指定目录下的文件,生成需要的数据
import {readFileSync} from 'fs'
import fs from 'fs'
import {join,relative,extname, basename} from 'path'
import {ensureDirSync} from 'fs-extra'
import yamlFront from "yaml-front-matter";
import glob from 'glob';

function filename_remove_ext(filename:string) :string{
    if( /\/$/.test(filename))
        filename = filename.replace(/\/$/,'')
    return filename.replace( extname(filename),'')
}

// 递归事件目录
// 路过

// 扫描目录后形成所目录结构数据的interface
export interface MenuInterface{
    title:string,
    path:string,
    out_path?:string
    children?: MenuInterface[]
}

class AnalyzeBlogDataClass {
    search_dir:string;
    output_prefix:string
    ignores:string[]

    constructor(search_dir:string, output_prefix:string = "dist" ,ignores : string[]= []) {
        this.search_dir = search_dir
        this.output_prefix = output_prefix
        this.ignores = ignores
    }

    
    //得到path路径下的md文件
    Glob_md(path:string) {
        return glob.glob.sync("*.md",{ignore:this.ignores,cwd:path})
    }

    //得到path路径下的 dir 目录
    Glob_dir(path:string) {
        return glob.glob.sync("*/",{ignore:this.ignores,cwd:path})
    }

    //扫描一个md文件
    do_for_one_md_file(path :string,filename:string): MenuInterface {
        let absolute_file_path = join(path,filename)
        let relative_file_path = relative(this.search_dir,absolute_file_path)
        let out_path = join(this.search_dir,this.output_prefix,basename(relative_file_path))
        let relative_out_path = relative(this.search_dir,out_path)

        //1. read file content
        let content = fs.readFileSync(absolute_file_path,{encoding:'utf8'})

        //2. get front yaml
        let yaml = yamlFront.loadFront(content)

        //3. get file info
        return {
            title: yaml.title || filename_remove_ext(filename),
            path: relative_file_path,
            out_path : relative_out_path
        }
    }


    // 返回值 bool 
    // if 返回 true ,则说明返回无内容
    work(path:string,title:string,object:MenuInterface) : Boolean {

        object.title = filename_remove_ext(title)
        console.log( path )

        let md_files = this.Glob_md(path);
        if( md_files.length ) object.children = []
            for( let md_file of md_files) {
                let a:MenuInterface = this.do_for_one_md_file(path, md_file);
                object.children.push(a);
            }

            let dirs = this.Glob_dir(path)
            if(dirs.length)
                if(!object.children ) object.children = [];
            else return true; //没有内容

            for( let dir of dirs){
                let new_path = join(path,dir);
                let a :MenuInterface = { title:'', path:''}
                let bret = this.work(new_path,dir,a)
                if( bret == false)
                    object.children.push(a)
            }
            return !object.children
    }

}


export const Analyze = (search_dir:string) => {

    let results:MenuInterface[] = []

    //最上级过滤的文件夹
    const ignores = ['node_modules/','bin/','dist/','public/']

    let AnalyzeBlogData  = new AnalyzeBlogDataClass(search_dir,'dist',ignores)

    let first_leve_dirs = glob.glob.sync("*/",{ignore:ignores,cwd:search_dir})

    //1 遍历的结构
    for( let dir of first_leve_dirs) {
        let _path = join(search_dir,dir);
        let a:MenuInterface = {title:'',path:''}
        AnalyzeBlogData.work(_path ,dir,a)
        results.push(a)
    }

    // let json_result = JSON.stringify(results,null,4)
    // fs.writeFileSync(join(output_prefix,'data.json'), json_result,{encoding:'utf8'})
    return results
}

