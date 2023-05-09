<template>
<div class="module-wrap m0 p0 fixed" style="top: 0px; left: 0px; bottom: 0px; width: 100%; z-index: 100000">
  <div class="module-head cl-white p10" style="background: #000">
    <span>{{graphTypeMenu[graphType].name}} - {{data.title}}</span>
    <span class="right pointer" @click="handleClose">关闭</span>
  </div>

  <div class="module-content absolute p0" style="top: 50px; bottom : 0px; width: 100%;">
    <div class="graph-wrap">
      <div class="graph-aside" v-if="!isShow">
        <Aside :graph="App" />
      </div>
      <div class="graph-main">
        <div class="graph-tools" v-if="!isShow">
          <Tool :graph="App" :data="{id: data.id}" :save="save" />

        </div>
        <div class="graph-content">
          <div id="paper-wrap" style="flex: 1">
            <div id="myholder" style="height: 100%"></div>
          </div>
          <div class="node-info" v-if="!isShow">
            <Attributes :graph="App" />
          </div>
        </div>
      </div>
      <!-- <Attributes :graph="App" v-model:show="showDrawer" v-if="showDrawer" /> -->
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  watch
} from 'vue'
import graphs from './indexss';
import Aside from './aside/index.vue'
import Tool from './tool/index.vue'
import Attributes from './attributes/index.vue'
import VueEvent from '@/utils/event'
import {
  color,
} from '@/assets/const'
import {
  useStore
} from '@/utils';
export default defineComponent({
  name: "MymodalD",
  components: {
    Aside,
    Tool,
    Attributes
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isShow: {
      type: Boolean,
      default: false
    },
    save: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  emits: ['close'],
  setup(props, context) {
    const store = useStore()
    const colorList = ref(color)
    const currentColor = ref("#fff")
    let info = ref("")
    let currentNodeId: any = ref("")
    const App: any = ref({})

    const nodeData: any = computed(() => store.getters['graph/nodeData']);
    const showDrawer: any = ref(false)
    const graphTypeMenu = [{
        type: 0,
        name: "结构图"
      },
      {
        type: 1,
        name: "机器人"
      },
    ]
    const graphType = ref(0)

    watch([props], (old: any, news: any) => {
      props.data && App.value.updateGraph(props.data.graph)
    })

    function handleClose() {
      const doc: any = document
      doc.body.parentNode.style.overflowY = "auto";
      context.emit('close', false)
    }

    onMounted(() => {
      let el: any = document.getElementById('myholder')
      App.value = new graphs(el)
      // props.isShow && props.data && App.value.updateGraph(props.data.graph)
      // 监听点击节点
      VueEvent.on("navbarSetting", (data: any) => {
        const aaa = data.attributes
        currentNodeId.value = data.id
        showDrawer.value = true
        store.dispatch('graph/NodeDataAction', aaa).then(res => {})
      });

      // 监听点击画布空白处
      VueEvent.on("blank", data => {
        App.value.setGraphData(currentNodeId.value)
      });

       let isRobot = window.location.href.indexOf('robot') > -1 ? 1 : 0
      graphType.value = isRobot
      store.commit('graph/setGraphType', isRobot)
    })

    return {
      App,
      showDrawer,
      info,
      graphType,
      graphTypeMenu,
      handleClose,
      nodeData,
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
    width: 180px;
    color: #c6c7e2;
    background: #383b61
  }

  .graph-main {
    background: #eee;
    flex: 1;
    height: 100%;

    .graph-tools {
      background: #f0f0f0;
      padding: 5px;
      height: 50px;
    }

    .graph-content {
      display: flex;
      height: 100%
    }

  }
}

.content-editable {
  width: calc(100% - 12px);
  box-sizing: content-box;
  min-height: 1em;
  height: auto;
  line-height: 16px;
  text-shadow: none;
  background: 0 0;
  border: 2px solid #4e517a;
  box-shadow: none;
  box-sizing: border-box;
  outline: 0;
  padding: 6px;
  overflow: auto;
}

.ps {
  height: 435px;
}
</style>
