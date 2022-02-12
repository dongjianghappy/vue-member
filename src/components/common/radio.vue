<template>
  <div>
    <span v-for="(item, index) in data"
          :key="index">
      <input type="radio"
             :id="item.value"
             :value="item.value"
             v-model="model"
             @click="handleclick(item.value)" />
      <label :for="item.value"
             @click="handleclick(item.value)">{{item.label}}</label>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'

export default defineComponent({
  name: 'v-Radio',
    props: {
        value: {
          type: Number,
          default: 1
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
    const model = ref(props.value)
    function handleclick(value: any){
      context.emit('update:value',value)
    }
    return {
      handleclick,
      model
    }
  }
})
</script>
