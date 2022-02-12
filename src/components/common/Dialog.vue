<template>
  <div id="screens"
       v-if="isShow"
       @click="handleCancel">
    <div id="detail"
         class="layer"
         @click.stop
         style="top: 55px; left: 534.5px; display: block; z-index: 9001; opacity: 1;"
         :style="{width: width, height: height, left: left}">
      <div id="msgtitle"
           class="layer-title"
           @mousedown="mousedown"><span>{{title}}</span></div><span id="close"
            class="layer-close"
            @click="handleCancel">关闭</span>
      <div id="msgcon"
           class="layer-content"
           style="height: 140px;">
        <slot name="content"></slot>
      </div>
      <div class="layer-btngroup"
           v-if="hasfooter">
        <slot name="footer">
          <v-button @onClick="handleClick"
                    v-if="confirm">确定</v-button>
          <v-button @onClick="handleCancel"
                    v-if="cancel">取消</v-button>
        </slot>

      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'

export default defineComponent({
  name: 'v-Search',
  props: {
    title: {
      type: String,
      default: "标题"
    },
    hasfooter: {
      type: Boolean,
      default: true
    },
    isShow: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Boolean,
      defualt: true
    },
    cancel: {
      type: Boolean,
      defualt: true
    },
    width: {
      type: String,
      default: '450px'
    },
    height: {
      type: String,
      default: '380px'
    }

  },

  emits: ['update:isShow', 'submit'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const left = ref(`${document.documentElement.clientWidth/2-parseInt(props.width)/2}px`)
    function handleCancel(){
      context.emit('update:isShow', false)
    }
    function handleClick(){
      context.emit('submit')
    }

    return {
      handleClick,
      handleCancel,
      left
    }
  }
})
</script>
