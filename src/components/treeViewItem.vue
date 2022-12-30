<script setup>
import { defineComponent, ref } from 'vue'

const emit = defineEmits(["clickArticle"])
defineProps({
  items: [],
})
defineComponent({
    name:'tree-view-item'
})


function click_link(item){
    emit('clickArticle',item)
}

</script>

<template>
<ul class="treeViteItem">
    <li v-for="(item ,idx) of items" :key="idx">
        <a href="javascript:;" :class="{article:item.path}" @click="click_link(item)">
            {{item.title}}
        </a>
        <tree-view-item v-if="item.children" :items="item.children" @clickArticle="click_link">
        </tree-view-item>
    </li>
</ul>
</template>

<style lang="scss" scoped>
@import '../style/treeViteItem.scss'
</style>
