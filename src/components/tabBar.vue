<script setup>
import { ref ,watch,defineProps,defineEmits} from 'vue'

const checked = ref(null)
const emit = defineEmits(['change'])

watch(
    ()=>checked.value,
    (val,old) => {
        console.log(val)
        emit("change",val)
    }
)

defineProps({
  tabs: [],
})

function tab_click() {
    console.log(tab_click)
}

function ulWheel(e) {
    console.log(e)
}
</script>

<template>
<ul class="tabBar-ul" @wheel.prevent="ulWheel">
    <li v-for="(item,index) of tabs" :key="index">
        <input type="radio" :id="'tab-'+index" name="tab" :value="index" v-model="checked">
        <label class="tab" :for="'tab-'+index"> {{`${index+1}: ` + item.name}} </label>
    </li>
</ul>
</template>

<style scoped lang="scss">
@import '../style/tabBar.scss';
</style>
