<script setup>

import {ref} from "vue"
import HelloWorld from './components/HelloWorld.vue'
import treeViewVue from './components/treeView.vue';
import tabBarVue from './components/tabBar.vue';

defineProps({
    links:[]
})


const tabs = ref([])
const TabBarRef = ref(null)

function tab_change(item) {
    changeArtile( item.path ||  item.title)
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
            {{article}}
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>
