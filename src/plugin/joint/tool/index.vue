<template>
<ul class="tool-button clearfix" style="width: 100%;">
  <li @click="handelClear"><i class="iconfont icon-amy-Clearcache"></i></li>
  <li><v-drawing querySelector="paper-wrap">导出图片</v-drawing></li>
  <li @click="fullScreen">全屏</li>
  <li>
    <CheckRobot :data="data" />
  </li>
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
  <li>
    <v-button @onClick="handleUndo">撤销</v-button>
  </li>
  <li>
    <v-button @onClick="handleRedo">恢复</v-button>
  </li>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
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
import CheckRobot from '../attributes/components/checkRobot.vue'
export default defineComponent({
  name: "MymodalD",
  components: {
    Popover,
    CheckRobot
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
      panZoomTiger.resetZoom()
      panZoomTiger.center();
    }

    function save() {
      let param: any = JSON.stringify(props.graph.graph.toJSON())
      props.save(param)
    }

    function handleUndo(){
      props.graph.undo()
    }

    function handleRedo(){
      props.graph.redo()
    }    

    // function chooseType(param: any) {
    //   graphType.value = param
    //   store.commit('graph/setGraphType', param)
    // }

    onMounted(() => {
     
    })

    return {
      fullScreen,
      handleReset,
      save,
      choose,
      handelClear,
      colorList,
      currentColor,
      handleUndo,
      handleRedo
      // chooseType
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

      &:hover {
        background: #383b61;
        color: #fff;
      }

      &.graph-type {
        background: none;
        color: #333;
        border: 0;

        &:hover {
          background: none;
          color: #000;
        }
      }
    }
  }

}
</style>
