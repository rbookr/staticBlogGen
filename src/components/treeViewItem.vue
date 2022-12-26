<script setup>
import { defineComponent, ref } from 'vue'

defineProps({
  items: [],
})
defineComponent({
        name:'tree-view-item'
})

const count = ref(0)
</script>

<template>
<ul class="treeViteItem">
    <li v-for="item of items">
        <label>
            {{item.title}}
        </label>
        <tree-view-item v-if="item.children" :items="item.children">
        </tree-view-item>
    </li>
</ul>
</template>

<style lang="scss" scoped>
@import '../style/treeViteItem.scss'
</style>
