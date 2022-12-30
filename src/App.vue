<script setup>

import {ref} from "vue"
import HelloWorld from './components/HelloWorld.vue'
import treeViewVue from './components/treeView.vue';
import tabBarVue from './components/tabBar.vue';

defineProps({
    links:[]
})


const tabs = [
{name:"name1"},
{name:"name2"},
{name:"name3"},
{name:"name4"},
{name:"namelong long long "},
]

function tab_change(val) {
    console.log("tab_change ",val)
}

var article = ref("")
// >> 事件处理
const deal_clickArticle = (item) => { article.value = item.path ||  item.title}
</script>

<template>
  <div class="main">
    <div class="sidebar">
        <treeViewVue :links="links" @clickArticle="deal_clickArticle" />
    </div>
    <div class="container">
        <div class="tabBar">
            <tab-bar-vue :tabs="tabs" @change="tab_change"/>
        </div>
        <div class="article-container">
            {{article}}
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>
