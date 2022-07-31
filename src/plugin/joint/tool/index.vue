<template>
<ul class="tool-button clearfix">
  <li @click="handelClear"><i class="iconfont icon-amy-Clearcache"></i></li>
  <li @click="exportImage('svg')">导出SVG</li>
  <li @click="exportImage('png')">导出PNG</li>
  <li @click="fullScreen">全屏</li>
  <li @click="handleReset">复位</li>
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
import svgPanZoom from 'svg-pan-zoom'
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
    graph: {
      type: Object,
      default: () => {
        return {}
      }
    },
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
      props.graph.graph.clear()
    }

    function exportImage() {
      props.graph.graph.exportImage()
    }

    function choose(color: any) {
      currentColor.value = color
      props.graph.setBackground(color)
    }

    function fullScreen() {
      // documentElement 属性以一个元素对象返回一个文档的文档元素
      const el: any = document.documentElement;
      el.requestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullscreen || el.msRequestFullScreen ?
        el.requestFullscreen() || el.mozRequestFullScreen() || el.webkitRequestFullscreen() || el.msRequestFullscreen() : null;

    }

    function handleReset() {
      var panZoomTiger = svgPanZoom('#myholder svg');

      // panZoomTiger.zoomIn()
      // panZoomTiger.zoomOut(0.01)
      panZoomTiger.resetZoom()
      /*panZoomTiger.resize(); // update SVG cached size and controls positions
      panZoomTiger.fit();*/
      panZoomTiger.center();

      // panZoomTiger.setZoomScaleSensitivity(0.5);
      // panZoomTiger.zoom(0.8);
    }

    function save() {
      let param: any = JSON.stringify(props.graph.graph.toJSON())
      debugger
      props.save(param)
    }

    return {
      exportImage,
      fullScreen,
      handleReset,
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
      background: #fff;
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
      &:hover{
        background: #383b61;
        color: #fff;
      }
    }
  }

}
</style>
