<script setup>
import HelloWorld from './components/HelloWorld.vue'
import treeViewVue from './components/treeView.vue';

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
</script>

<template>
  <div class="main">
    <div class="sidebar">
        <treeViewVue :links="links" />
    </div>
    <div class="tabBar">
    </div>
    <div class="article-container">
    </div>
  </div>
</template>

<style scoped>
</style>
