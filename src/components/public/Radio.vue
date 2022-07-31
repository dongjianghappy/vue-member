<template>
<label class="relative mr25" style="display: inline-block; line-height: 18px;">
  <input type="radio" :name="name" :value="value" v-model="checked" :checked="checked === value" class="mr5" style="float: left" @change="handleclick(value)" />
  <span>{{label}}</span>
</label>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
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
    }
  },
  emits: [`update:checked`],
  setup(props, context) {
    function handleclick(param: any) {
      context.emit(`update:checked`, param)
    }
    return {
      handleclick
    }
  }
})
</script>
