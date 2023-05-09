<template>
<div class="radio-group">
  <label class="relative" :class="{current: checked === item.value}" style="" v-for="(item, index) in enums" :key="index" @change="handleClick(item.value)">
    <input type="radio" :name="name" :value="item.value" v-model="checked" :checked="checked == item.value" class="mr5" style="float: left; display: none" />
    <span>{{item.label}}</span>
  </label></div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-RadioButton',
  props: {
    label: {
      type: String,
      default: "",
    },
    enums: {
      type: Object,
      default: () => {
        return {}
      },
    },
    name: {
      type: String,
      default: "",
    },
    checked: {
      type: String,
      default: "0"
    }
  },
  emits: [`update:checked`],
  setup(props, context) {
    function handleClick(param: any) {
      context.emit(`update:checked`, param)
    }
    return {
      handleClick
    }
  }
})
</script>
