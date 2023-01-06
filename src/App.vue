<script setup>

import {ref,computed, getCurrentScope,defineExpose} from "vue"
import HelloWorld from './components/HelloWorld.vue'
import treeViewVue from './components/treeView.vue';
import tabBarVue from './components/tabBar.vue';
import {createMarkdownRenderer,fetch_md}from '../tools/markdown.js'

defineProps({
    links:[]
})

const tabs = ref([])
const TabBarRef = ref(null)
const markdown = ref("")
const markdownToHtml = ref("")

function tab_change(item) {
    changeArtile( item.path ||  item.title)
    console.log('fetch_md')
    fetch_md(item.path).then ( md => {
        markdownToHtml.value = md
    })
}

var article = ref("")
// >> 事件处理
const changeArtile = (_article) => { 
    article.value = _article
}
const deal_clickArticle = (item) => { 
    changeArtile( item.path ||  item.title)
    //tabs.value.push(item)
    TabBarRef.value.push_item(item);
}

//// ======> Global API
// 得到当前的ActiveTaB的信息
// { path, title,outputPath}
const getCurrentTabInfo = ()=>{
    return TabBarRef.value.getCurrentTabInfo()
}

const version = ()=>{
    return 'alpha 0.1';
}

window.getCurrentTabInfo = getCurrentTabInfo

defineExpose({getCurrentTabInfo,version})

</script>

<template>
  <div class="main">
    <div class="sidebar">
        <treeViewVue :links="links" @clickArticle="deal_clickArticle" />
    </div>
    <div class="container">
        <div class="tabBar">
            <tab-bar-vue :tabs="tabs" @change="tab_change" ref="TabBarRef"/>
        </div>
        <div class="article-container">
            <span class="article-path"> {{article}} </span>
            <div class="markdown-body" v-html="markdownToHtml"></div>
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>
