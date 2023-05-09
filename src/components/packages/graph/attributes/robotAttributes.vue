<template>
<div class="node-info">
  <perfect-scrollbar>
    <!-- 边框样式 -->
    <v-collapse title="样式设置222">
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
      <div class="mb10" v-if="node.ftype === 'link' || node.ftype === 'intentionLink'">
        连线种类
        <v-select :enums="linkStyle" @setAttr="chooseColor" attr="ftype" :value="ftype" />
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
    <v-collapse title="高级设置" :iscollapse="true" v-if="node.ftype !== 'start' && node.ftype !== 'link'">
      <NodeSpeech :data="node.data" v-if="node.ftype !== 'link' && node.ftype !=='intentionLink'" />
      <LinkSpeech :data="node.data" v-else />
    </v-collapse>
  </perfect-scrollbar>
  <div class="p15">
    <div id="paper-multiple-papers-small" class="bg-white" style="width: 200px; height: 200px;"></div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed
} from 'vue'
import NodeSpeech from './components/nodeSpeech.vue'
import LinkSpeech from './components/linkSpeech.vue'
import Broadcast from './components/broadcast.vue'
export default defineComponent({
  name: "MymodalD",
  components: {
    NodeSpeech,
    LinkSpeech,
    Broadcast
  },
  props: {
    node: {
      type: Object, 
      default: () => {
        return {}
      }
    },
    attrs: {
      type: Object,
      default: () => {
        return {}
      }
    },
    borderStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['setAttrs'],
  setup(props, context) {
    const linkStyle = [{
        value: 'link',
        name: '链接线',
      },
      {
        value: 'intentionLink',
        name: '意图线',
      }
    ]

    function chooseColor(param: any) {
      context.emit('setAttrs', param)
    }

    function textBlur(e: any, attr: any) {
      context.emit('setAttrs', {
        islabel: true,
        attr: "text",
        value: e.currentTarget.innerHTML
      })
    }

    return {
      linkStyle,
      chooseColor,
      textBlur,
    }
  }
})
</script>

<style lang="less" scoped>
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
