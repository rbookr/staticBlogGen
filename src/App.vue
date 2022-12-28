<script setup>

import HelloWorld from './components/HelloWorld.vue'
import treeViewVue from './components/treeView.vue';
import tabBarVue from './components/tabBar.vue';

defineProps({
    msg:String
})

const links = [
    {
        title:'name1',
        children: [
            {
                title: "c1",
                children :[
                    {
                        title: "c1-1",
                    }
                ]
            }
        ]
    },
    {
        title:'name2',
        children: [
            {
                title: "c2",
                children :[
                    {
                        title: "c2-1",
                    }
                ]
            }
        ]
    },
    {
        title:'name3',
        children: [
            {
                title: "c3",
                children :[
                    {
                        title: "c3-1",
                    }
                ]
            }
        ]
    },
]

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
</script>

<template>
  <div class="main">
    <div class="sidebar">
        <treeViewVue :links="links" />
    </div>
    <div class="container">
        <div class="tabBar">
            <tab-bar-vue :tabs="tabs" @change="tab_change"/>
        </div>
        <div class="article-container">
            <p>
            hello
            </p>
            {{msg}}
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>
