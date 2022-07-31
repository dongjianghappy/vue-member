<template>
<perfect-scrollbar>

  <!-- 边框样式 -->
  <v-collapse title="样式设置">
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
        <div contenteditable="true" class="content-editable" data-type="content-editable" data-attribute="attrs/label/text" @blur="textBlur" style="display: inline-block;">
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
  <v-collapse title="高级设置">
    <div>

    </div>
  </v-collapse>
</perfect-scrollbar>

<div class="p15">
  <div id="paper-multiple-papers-small" class="bg-white" style="width: 200px; height: 200px;"></div>
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
import VueEvent from '@/utils/event'
import Popover from '@/components/packages/popover/index.vue';
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
    Popover
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

    return {
      borderStyle,
      node,
      attrs,
      data,
      chooseColor,
      textBlur

    }
  }
})
</script>

<style lang="less" scoped>
.node-info {
  background: #383b61;
  width: 230px;
  color: #c6c7e2;

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
