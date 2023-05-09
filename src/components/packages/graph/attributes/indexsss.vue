<template>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="选择意图 " width="300" :hasfooter="false" :submit="submit" :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <div class="node-info">
      <!-- 边框样式 -->
      <v-collapse title="样式设置111">
        <div class="clearfix" v-if="node.ftype !== 'link'">
          <div class="col-md-6 align_left h70">
            <span>填充</span>
            <div class="">
              <v-colorpicker @color="chooseColor" :color="attrs.fill" attr="fill" />
            </div>
          </div>
          <div class="col-md-6 align_center">
            <span>边框</span>
            <div>
              <v-colorpicker @color="chooseColor" :color="attrs.stroke" attr="stroke" />
            </div>
          </div>
        </div>
        <div class="h70" v-else>
          <span>边框</span>
          <div>
            <v-colorpicker @color="chooseColor" :color="attrs.stroke" attr="stroke" />
          </div>
        </div>
        <div>
          边框样式
          <v-select :enums="borderStyle" @setAttr="chooseColor" attr="strokeDasharray" :value="attrs.strokeDasharray" />
        </div>
      </v-collapse>

      <!-- 文本样式 -->
      <v-collapse title="文本设置">
        <ul class="form-wrap-box">
          <li class="vertical">
            <div class="label">名称</div>
            <div contenteditable="true" class="content-editable" @blur="textBlur" style="display: inline-block;">
              {{attrs.text}}
            </div>
          </li>
        </ul>
        <div class="align_left h70 mt10">

          <span>填充</span>
          <div>
            <v-colorpicker @color="chooseColor" :color="attrs.textColor" :islabel="true" attr="fill" />
          </div>
        </div>

      </v-collapse>

      <!-- 高级设置 -->
      <v-collapse title="高级设置" :iscollapse="true">
        <NodeSpeech :data="data" v-if="node.ftype !== 'link'" />
        <LinkSpeech :data="data" v-else />
        <!-- <v-tabs :tabs="tabMenu">

      <template v-slot:content1>

        <div>
          <span @click="handleSpeech"><i class="iconfont" :class="`icon-anonymous-iconfont`" />添加话术</span>
        </div>
        <ul class="form-wrap-box">

          <li class="p10 vertical" style="background: #464973;" v-for="(item, index) in data && data.basicSpeech" :key="index">
            <div class="label">{{index+1}}、 <span class="right"><i class="iconfont icon-close font12 pointer" @click="handleDelete(item, 'basicSpeech')" /></span></div>
            播报话术:
            <Broadcast :speech="item.speech" />
            <Speech :data="item" />
          </li>
        </ul>
      </template>
      <template v-slot:content2>
        <div>
          <Intention action="edit" @save="choose($event, 'objectionIntention')" :data="data && data.objectionIntention" />
        </div>
        <ul class="form-wrap-box">

          <li class="p10 vertical" style="background: #464973;" v-for="(item, index) in data && data.objectionIntention" :key="index">
            <div class="label">{{item.name}} <span class="right"><i class="iconfont icon-close font12 pointer" @click="handleDelete(item, 'objectionIntention')" /></span></div>
            播报话术:
            <Broadcast :speech="item.speech" />
            <Speech :data="item" />
          </li>
        </ul>
      </template>
      <template v-slot:content3>
        <div>
          <Intention action="edit" @save="choose($event, 'endIntention')" :data="data && data.endIntention" />
        </div>
        <ul class="form-wrap-box">

          <li class="p10 vertical" style="background: #464973;" v-for="(item, index) in data && data.endIntention" :key="index">
            <div class="label">{{item.name}} <span class="right"><i class="iconfont icon-close font12 pointer" @click="handleDelete(item, 'endIntention')" /></span></div>
            播报话术:
            <Broadcast :speech="item.speech" />
            <Speech :data="item" />
          </li>
        </ul>
      </template>
    </v-tabs> -->

        <!-- {{data}} -->

      </v-collapse>
    <!-- <div class="p15">
      <div id="paper-multiple-papers-small" class="bg-white" style="width: 200px; height: 200px;"></div>
    </div> -->
    </div>
  </template>
</v-drawer>
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
import VueEvent from '@/utils/event'

import NodeSpeech from './components/nodeSpeech.vue'
import LinkSpeech from './components/linkSpeech.vue'
import Broadcast from './components/broadcast.vue'
import {
  color,
} from '@/assets/const'
import {
  useStore
} from '@/utils';
import {
  stringify
} from 'querystring';
export default defineComponent({
  name: "MymodalD",
  components: {
    NodeSpeech,
    LinkSpeech,
    Broadcast
  },
  props: {
    graph: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props, context) {
    const store = useStore()
    const isShow: any = ref(true)
    const node: any = computed(() => store.getters['graph/nodeData'] || {});
    const attrs: any = computed(() => {
      const attr = store.getters['graph/nodeData'].attrs
      if (node.value.ftype === 'link') {

        return {
          stroke: attr && attr.line.stroke,
          strokeDasharray: attr.line.strokeDasharray,
          fill: attr && attr.line.fill,
          text: attr && attr.text.text,
          textColor: attr && attr.text.fill,
        }
      } else {
        debugger
        return {
          stroke: attr && attr.body.stroke,
          strokeDasharray: attr && attr.body.strokeDasharray,
          fill: attr && attr.body.fill,
          text: attr && attr.label.text,
          textColor: attr && attr.label.fill
        }
      }

    });
    const data: any = computed(() => store.getters['graph/nodeData'].data);
    const borderStyle = [{
        value: 'none',
        name: '实线',
      },
      {
        value: '5',
        name: '点线',
      },
      {
        value: '10, 5',
        name: '虚线',
      }
    ]

    const index: any = ref(0)

    const ssss: any = ref([])

    function chooseColor(param: any) {
      debugger
      props.graph.setAttrs({
        id: node.value.id,
        islabel: param.islabel,
        type: "attrs",
        attr: `${param.attr}`,
        value: param.value
      })
    }

    function textBlur(e: any) {
      chooseColor({
        islabel: true,
        attr: "text",
        value: e.currentTarget.innerHTML
      })
      debugger
    }

    function choose(param: any, name: any) {
      data.value[name] = param
    }

    function handleDelete(param: any, name: any) {
      let index = data.value && data.value[name].findIndex((item: any) => item.id === param.id)

      data.value && data.value[name].splice(index, 1)
    }

    function handleSpeech() {
      data.value.basicSpeech.push({
        speech: ""
      })
    }

    return {
      borderStyle,
      isShow,
      node,
      attrs,
      data,
      ssss,
      chooseColor,
      textBlur,
      handleDelete,
      choose,
      index,
      handleSpeech
    }
  }
})
</script>

<style lang="less" scoped>

.collapse-head{
  background: #424568;
}
.node-info {
      background: #383b61;
      width: 300px;
      color: #c6c7e2;
    }
.node-info {
  background: #383b61;
  width: 300px;
  color: #c6c7e2;

  .content-editable {
    /* width: calc(100% - 12px); */
    width: 100%;
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

  .fill {
    display: inline-block;
    background: #fff;
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

.ps {
  height: 435px;
}
</style>
