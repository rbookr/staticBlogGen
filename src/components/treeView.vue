<script setup>
import { ref } from 'vue'
import treeViewItem from './treeViewItem.vue'

defineProps({
  links: [],
})


const count = ref(0)
</script>

<template>
<div class="treeview-container">
        <template v-for="(link,idx) of links" :key="idx">
            <label :for="idx"> {{link.title}} </label>
            <input type="radio" :id="idx" name="treeView-name">
            <div class="vTree-menu">
                <tree-view-item :items="link.children" />
            </div>
        </template>
    <div class="mask"></div>
</div>
</template>

<style lang="scss" scoped>
@import "../style/treeView.scss"
</style>
