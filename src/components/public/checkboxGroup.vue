<template>
<label class="relative mr15 mb15" v-for="(item, index) in tagList" :key="index" style="display: inline-block; line-height: 18px;">
  <input type="checkbox" :checked="checked.indexOf(item.tag) > -1" @click="handleclick(item.tag)" class="mr5" style="float: left" />
  <span>{{item.value || '属性'}}</span>
</label>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-CheckboxGroup',
  props: {
    tagList: {
      type: Array,
      default: () => {
        return
      }
    },
    checked: {
      type: Array,
      default: []
    }
  },
  setup(props, context) {
    function handleclick(id: any) {
      if (props.checked.indexOf(id) > -1) {
        let index = props.checked.indexOf(id)
        props.checked.splice(index, 1)
      } else {
        props.checked.push(id)
      }
    }
    return {
      handleclick
    }
  }
})
</script>
