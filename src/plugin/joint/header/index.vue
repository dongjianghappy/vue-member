<template>
<ul class="tool-button clearfix">
  <li @click="handelClear"><i class="iconfont icon-amy-Clearcache"></i></li>
  <li @click="exportImage('svg')">导出SVG</li>
  <li @click="exportImage('png')">导出PNG</li>
  <li>全屏</li>

  <Popover :content="`<span style='
            background: ${currentColor};
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
  <li>
    <v-button @onClick="save">保存</v-button>
  </li>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from 'vue'
import Popover from '@/components/packages/popover/index.vue';
import {
  color
} from '@/assets/const'
import {
  useStore
} from '@/utils';
export default defineComponent({
  name: "MymodalD",
  components: {
    Popover
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    save: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const store = useStore()
    const colorList = ref(color)
    const currentColor = ref("#fff")
    const App: any = ref({})

    // 清空
    function handelClear() {
      App.value.graph.clear()
    }

    function exportImage() {
      App.value.graph.exportImage()
    }

    function choose(color: any) {
      currentColor.value = color
      App.value.setBackground(color)
    }

    function save() {
      let param: any = JSON.stringify(App.value.graph.toJSON())
      debugger
      props.save(param)
    }

    return {
      exportImage,
      save,
      choose,
      handelClear,
      colorList,
      currentColor
    }
  }
})
</script>

<style lang="less" scoped>
.graph-tools {
  background: #f0f0f0;
  padding: 5px;
  height: 50px;

  .tool-button {
    display: inline-block;
    padding: 4px;

    li {
      float: left;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding: 0 10px;
      min-width: 32px;
      height: 32px;
      margin-right: 8px;
      line-height: 30px;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
    }
  }

}
</style>
