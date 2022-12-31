<script setup>
import { ref ,watch,defineProps,defineEmits,computed,defineExpose} from 'vue'

const checked = ref(0)
const emit = defineEmits(['change','update:modelValue'])


watch(
    ()=>checked.value,
    (val,old) => {
        emit("change",tabs.value[val])
        //emit("update:modelValue",val) //当 选中的index改变时,
    }
)
const tabs = ref([])
defineProps({
  //tabs: [],
})

function tab_click() {
    console.log(tab_click)
}

function ulWheel(e) {
    console.log(e)
}

function event_close(){

}

//添加子方法
const push_item = (item)=>{
    for( let [idx,{path}] of tabs.value.entries()) {
        if( path == item.path){
            checked.value = idx
            return;
        }
    }
    tabs.value.push(item)
    checked.value = tabs.value.length-1
}

const set_last_active = () =>{}

defineExpose({push_item,set_last_active})

</script>/

<template>
<ul class="tabBar-ul" @wheel.prevent="ulWheel">
    <li v-for="(item,index) of tabs" :key="index">
        <input type="radio" :id="'tab-'+index" name="tab" :value="index" v-model="checked">
        <label class="tab" :for="'tab-'+index"> {{`${index+1}: ` + item.title}} 
        <span class="close_icon">x</span>
        </label>
    </li>
</ul>
<div class="treeViteItem-bottom-bar"></div>
</template>

<style scoped lang="scss">
@import '../style/tabBar.scss';
</style>
