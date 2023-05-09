<template>
<label class="relative mr25" style="display: inline-block; line-height: 18px;">
  <input type="radio" :name="name" :value="value" v-model="checked" :checked="checked === value" class="mr5" style="float: left" @change="handleclick(value)" :disabled="disabled" />
  <span>{{label}}</span>
</label>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-Radio',
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    checked: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  emits: ['onClick', 'update:checked'],
  setup(props, context) {
    function handleclick(param: any) {
      context.emit(`onClick`, param)
      context.emit(`update:checked`, param)
    }
    return {
      handleclick
    }
  }
})
</script>
