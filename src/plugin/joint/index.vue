<template>
<div class="graph-wrap">
  <div class="graph-aside" v-if="!isShow">
    <Aside :graph="App" />
  </div>
  <div class="graph-main">
    <div class="graph-tools" v-if="!isShow">
      <Tool :graph="App" :save="save" />
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
import Popover from '@/components/packages/popover/index.vue';
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
    Attributes,
    Popover
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

    onMounted(() => {
      let el: any = document.getElementById('myholder')

      App.value = new graphs(el)
      props.isShow && App.value.updateGraph(props.data)
      // 监听点击节点
      VueEvent.on("navbarSetting", (data: any) => {
        const aaa = data.attributes
        currentNodeId.value = data.id
        store.dispatch('graph/NodeDataAction', aaa).then(res => {

        })
      });

      // 监听点击画布空白处
      VueEvent.on("blank", data => {
        App.value.setGraphData(currentNodeId.value)
      });
    })

    return {
      App,
      info,
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
    }

    .graph-content {
      display: flex;
      height: 100%
    }

    .node-info {
      background: #383b61;
      width: 230px;
      color: #c6c7e2;
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
