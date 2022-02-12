<template>
  <div>
    <span v-for="(item, index) in data"
          :key="index">
      <input type="checkbox"
             :id="item.value"
             :value="item.value"
             v-model="checkbox"
             @click="handleclick(item.value)" />
      <label :for="item.value"
             @click="handleclick(item.value)">{{item.label}}</label>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'

export default defineComponent({
  name: 'v-Checkbox',
    props: {
        checkValue: {
          type: Array,
          default: () => []
        },
        data: {
          type: Array,
            default: ()=>[{
              label: "是",
              value: 1
            },{
              label: "否",
              value: 0
            }]
        }
    },
  emits: ['update:value'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const checkbox = ref(props.checkValue)

    function handleclick(value: any){
      context.emit('update:value',value)
    }
    return {
      handleclick,
      checkbox
    }
  }
})
</script>
