<template>
  <div class="flex" >
    <div style="flex: 1">
      <input type="text" v-model="data[attr]" class="input-sm input-full" />
    </div>
    <div style="width: 36px">
      <v-colorpicker @color="chooseColor" :color="data[attr]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    return: () => {
      return {}
    }
  },
  attr: {
    type: String,
    default: 'color'
  }
})

    function chooseColor(param: any) {
      props.data[props.attr] = param.value
    }
</script>