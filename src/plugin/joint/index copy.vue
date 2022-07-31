<template>
<div class="graph-wrap">
  <div class="graph-aside" v-if="!isShow">
    <ul class="clearfix">
      <li style="padding: 10px">
        <div class="rect" draggable="true" @dragstart="(e, fType, text)=>dragstart(e, 'rect', '矩形')">矩形</div>
      </li>
      <li style="padding: 10px">
        <div class="round" draggable="true" @dragstart="(e, fType, text)=>dragstart(e, 'start', '圆形')">圆形</div>
      </li>
    </ul>
  </div>
  <div class="graph-main">
    <div class="graph-tools" v-if="!isShow">
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
        <!-- <v-titleattribute /> -->

        <li>
          <v-button @onClick="save">保存</v-button>
        </li>
      </ul>
    </div>
    <div class="graph-content">
      <div id="myholder" style="height: 100%"></div>
      <div class="node-info" v-if="!isShow">
        <perfect-scrollbar>
          <v-collapse title="样式设置">
            <div class="clearfix">
              <div class="col-md-6 align_left h70">
                <span>填充</span>
                <div class=""><img class="select-box-option-icon fill" src="@/assets/image/transparent-icon.svg"></div>
              </div>
              <div class="col-md-6 align_center">
                <span>边框</span>
                <div>
                  <div class="outline"></div>
                </div>
              </div>
            </div>
            <div>
              边框样式
              <v-select :enums="[
  {
    value: 'solid',
    name: '实线',
  },
  {
    value: 'dotted',
    name: '点线',
  },
  {
    value: 'dashed',
    name: '虚线',
  }]" />
            </div>
          </v-collapse>
          <v-collapse title="文本设置">
            
            <ul class="form-wrap-box">
              <li class="vertical">
                <div class="label">名称</div>
                <div contenteditable="true" class="content-editable" data-type="content-editable" data-attribute="attrs/label/text" style="display: inline-block;">
                  {{nodeData.name}}
                </div>

                <!-- <div>
                <input v-model="nodeData.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
              </div> -->
              </li>
            </ul>

            <div>
              边框样式
              <v-select :enums="[
  {
    value: 'solid',
    name: '实线',
  },
  {
    value: 'dotted',
    name: '点线',
  },
  {
    value: 'dashed',
    name: '虚线',
  }]" />
            </div>

            <div class="align_left h70 mt10">

              <span>填充</span>
              <div class="">
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
              </div>
            </div>

          </v-collapse>

          <!-- 高级设置 -->
          <v-collapse title="高级设置">
            <div>
              
            </div>
          </v-collapse>
        </perfect-scrollbar>

<div class="p15">
  <div id="paper-multiple-papers-small" class="bg-white"></div>
</div>
        
      </div>
    </div>

  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  computed,
  reactive,
  watch
} from 'vue'
import graphs from './indexss';
import VueEvent from '@/utils/event'
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
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const store = useStore()
    const colorList = ref(color)
    const currentColor = ref("#fff")
    let info = ref("")
    let currentNodeId: any = ref("")
    const App: any = ref({})

    const nodeData: any = computed(() => store.getters['graph/nodeData']);

    watch([props], (old: any, news: any) => {
      // let cells = JSON.parse(news)
      App.value.updateGraph(props.data)
    })

    function message() {
      console.log("123");

    }

    function dragstart(e: any, fType: any, text: any) {
      e.dataTransfer.setData('ftype', fType)
      e.dataTransfer.setData('text', text)
      e.dataTransfer.setData('offsetX', e.offsetX)
      e.dataTransfer.setData('offsetY', e.offsetY)
    }

    onMounted(() => {
      let el: any = document.getElementById('myholder')

      App.value = new graphs(el)
      props.isShow && App.value.updateGraph(props.data)
      // 监听点击节点
      VueEvent.on("navbarSetting", (data: any) => {
        const aaa = data.attributes.data
        currentNodeId.value = data.id
        store.dispatch('graph/NodeDataAction', aaa).then(res => {

        })
      });

      // 监听点击画布空白处
      VueEvent.on("blank", data => {
        App.value.setGraphData(currentNodeId.value)
      });
    })

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
      message,
      info,
      dragstart,
      nodeData,
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
.graph-wrap {
  display: flex;
  height: 100%;

  .graph-aside {
    width: 240px;
    height: 100%;
    color: #c6c7e2;
    background: #383b61
  }

  .graph-main {
    background: #eee;
    width: 100%;
    height: 100%;

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

    .graph-content {
      display: flex;
      height: 100%
    }

    .node-info {
      background: #383b61;
      width: 230px;
      color: #c6c7e2;

      .fill {
        width: 30px;
        height: 30px;
        border: none;
        border-radius: 6px;
        padding: 0;
      }

      .outline {
        display: inline-block;
        border: 3px solid #fe854f;
        width: 30px;
        height: 30px;
        border-radius: 6px;
        padding: 0;
      }
    }
  }
}

.rect {
  border: 2px solid #31d0c6;
  border-radius: 3px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  cursor: move;
  text-align: center;
}

.diamond {
  width: 200px;
  height: 200px;
  background-color: red;
  transform: rotate(45deg);
  margin: 100px auto;
}

.round {
  border: 2px solid #31d0c6;
  border-radius: 30px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  cursor: move;
  text-align: center;
}

.ps {
  height: 435px;
}
</style>
