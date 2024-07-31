<template>
<v-popover :content="`<span style='
            background: ${color || currentColor};
            margin: 0 5px;
            display: flex;
            width: 32px;
            height: 32px;
            justifyContent: center;
            alignItems: center;
            border: 1px solid #ccc;
            fontWeight: bold;
             fontStyle: italic;'>
            </span>`" arrow="tb" offset="right" :move="-200" keys="popover-face">
  <div class="p5" style="width: 298px;">
    <div style="display: flex; flex-wrap: wrap;">
      <div style="width: 36px; height: 36px;" v-for="(color, index) in colorList" :key="index">
        <div style="margin: 3px; border: 1px solid rgb(221, 221, 221); width: 30px; height: 30px;" :style="{background: color}" @click="choose(color)"></div>
      </div>
    </div>
    <div class="mt10" style="display: flex;">
      <div style="margin-left: 3px; margin-top: 3px; width: 16px; height: 16px;" :style="{background: currentColor}"></div>
      <div style="margin-left: 5px;">{{currentColor}}</div>
    </div>
  </div>
</v-popover>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref
} from 'vue'
import {
  colorList
} from '@/assets/const'
const props: any = defineProps({
  islabel: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ""
  },
  attr: {
    type: String,
    default: ""
  }
})
const emit: any = defineEmits(['color'])
const currentColor = ref("#fff")

function choose(color: any) {
  currentColor.value = color
  emit('color', {
    islabel: props.islabel,
    attr: props.attr,
    value: color
  })
}
</script>
