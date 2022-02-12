<template>
  <div>
    <input type="radio"
           :id="value"
           :value="value"
           v-model="model" />
    <label :for="value">{{label}}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },    
  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const model = ref("0")
    function handleclick(){
      context.emit('onClick')
    }
    return {
      handleclick,
      model
    }
  }
})
</script>
