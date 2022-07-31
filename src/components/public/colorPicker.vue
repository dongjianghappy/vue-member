<template>
<Popover :content="`<span style='
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
</Popover>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'
import Popover from '@/components/packages/popover/index.vue';
import {
  color
} from '@/assets/const'
export default defineComponent({
  name: 'v-ColorPicker',
  components: {
    Popover
  },
  props: {
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
  },
  emits: ['color'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const colorList = ref(color)
    const currentColor = ref("#fff")

    function choose(color: any) {
      currentColor.value = color
      context.emit('color', {
        islabel: props.islabel,
        attr: props.attr,
        value: color
      })
    }
    return {
      currentColor,
      colorList,
      choose
    }
  }
})
</script>
