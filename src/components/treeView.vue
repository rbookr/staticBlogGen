<script setup>
import { ref } from 'vue'
import treeViewItem from './treeViewItem.vue'

import bars from '../assets/bars.svg'

defineProps({
  links: {type:Array,default:[]},
  prefixId:""
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

const emit = defineEmits(["clickArticle"])

// >> method event
function deal_clickArticle(item) {
    emit("clickArticle",item)
}

</script>

<template>
<div class="treeview-container">
    <div style="z-index:301;">
    <template v-for="(link,idx) of links" :key="'prefixId' + '-'+idx">
            <input type="radio" :id="'vTree'+idx" name="treeView-name">
            <div class="vTree-menu">
                <tree-view-item :items="link.children"  @clickArticle="deal_clickArticle"/>
            </div>
    </template>
    </div>
    <div class="mask">
    <label for="treeview-show" class="toggle-bar"> 
        <bars/>
    </label>
    <input type="checkbox" id="treeview-show"/>
        <label v-for="(link,idx) of links" :data="'vTree'+idx" @click="toggle_radio($event)"> {{link.title}} </label>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import "../style/treeView.scss"
</style>
