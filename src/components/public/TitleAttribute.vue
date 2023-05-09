<template>
<div style="width: 150px; display: flex; justifyItems: flex-start">

  <v-popover :content="`<span style='
            background: ${style.color || currentColor};
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
        <div style="margin-left: 3px; margin-top: 3px; width: 16px; height: 16px;" :style="{background: style.color || currentColor}"></div>
        <div style="margin-left: 5px;">{{style.color || currentColor}}</div>
      </div>
    </div>
  </v-popover>
  <span style="
            margin-right: 5px;
            display: flex;
            width: 32px;
            height: 32px;
            justifyContent: center;
            alignItems: center;
            border: 1px solid #ccc;
            fontWeight: bold;
        " :class="{active: style.fontWeight}" @click="handleclick('bold')">
    B
  </span>
  <span style="
            background: style ? #f1f1f1 : none;
             margin-right: 5px;
            display: flex;
            width: 32px;
            height: 32px;
            justifyContent: center;
            alignItems: center;
            border: 1px solid #ccc;
            fontStyle: italic;
        " :class="{active: style.fontStyle}" @click="handleclick('style')">
    I
  </span>
  <span style="
            background: underline ? #f1f1f1 : none;
             margin-right: 5px;
            display: flex;
            width: 32px;
            height: 32px;
            justifyContent: center;
            alignItems: center;
            border: 1px solid #ccc;
        " :class="{active: style.textDecoration}" @click="handleclick('underline')">
    U
  </span>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'
import {
  color
} from '@/assets/const'

export default defineComponent({
  name: 'v-Search',
  data() {
    return {
      background: "#f1f1f1"
    }
  },
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    },
    setStyle: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const colorList: any = ref(color)
    const currentColor: any = ref("#fff")

    let attr: any = ref({})

    function handleclick(param: any) {
      attr.value = props.style

      if (param === 'bold') {
        !attr.value.fontWeight ? attr.value.fontWeight = "bold" : delete attr.value.fontWeight
      } else if (param === 'style') {
        !attr.value.fontStyle ? attr.value.fontStyle = "italic" : delete attr.value.fontStyle
      } else if (param === 'underline') {
        !attr.value.textDecoration ? attr.value.textDecoration = "underline" : delete attr.value.textDecoration
      }
      props.setStyle(attr)
    }

    function choose(color: any) {
      attr.value = props.style
      currentColor.value = color
      currentColor.value ? attr.value.color = color : delete attr.value.color
      props.setStyle(attr)
    }
    return {
      handleclick,
      colorList,
      choose,
      currentColor
    }
  }
})
</script>

<style scoped>
.active {
  background: #f1f1f1;
}
</style>
