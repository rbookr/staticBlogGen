<script setup>
import { ref } from 'vue'
import treeViewItem from './treeViewItem.vue'

defineProps({
  links: [],
})


// >> method
function toggle_radio(self){
    //if( self.target.nextElementSibling.checked == true)
     //   self.target.nextElementSibling.checked = false;
    let id = self.target.getAttribute('data')
    let radio_dom = self.target.parentNode.parentNode.querySelectorAll('#'+id)[0]
    radio_dom.checked = !radio_dom.checked
    if( self.target.classList.contains('active')){
        self.target.classList.remove('active')
        return;
    }

    self.target.parentNode.querySelectorAll('.active').forEach( e => e.classList.remove('active'))
    self.target.classList.add('active')
}
</script>

<template>
<div class="treeview-container">
    <div style="z-index:301;">
    <template v-for="(link,idx) of links" :key="idx">
            <input type="radio" :id="'vTree'+idx" name="treeView-name">
            <div class="vTree-menu">
                <tree-view-item :items="link.children" />
            </div>
    </template>
    </div>
    <div class="mask">
        <label v-for="(link,idx) of links" :data="'vTree'+idx" @click="toggle_radio($event)"> {{link.title}} </label>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import "../style/treeView.scss"
</style>
