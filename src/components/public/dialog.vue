<template>
<div class="drawer-wrap align_left" :class="{'drawer-open': show}" style="top: 0">
  <v-mask v-show="show" v-model:isShow="isShow">
  </v-mask>
  <div v-if="show">
    <div id="detail" class="layer" :class="[{'animation-fadein': isShow}, className]" @click.stop style="left: 534.5px; display: block; z-index: 9001; opacity: 1;" :style="{width: width, height: height, top: top, left: left}">
      <div v-if="title" id="msgtitle" class="layer-title" @mousedown="mousedown"><span>{{title}}</span></div><span id="close" v-if="close" class="layer-close" @click="handleCancel"><i class="iconfont icon-close"></i></span>
      <div id="msgcon" class="layer-content" :class="[className]" style="min-height: 150px;" :style="{height: conheight}">
        <slot name="content"></slot>
      </div>
      <div class="layer-btngroup" v-if="hasfooter">
        <slot name="footer">
          <v-space>
            <v-button @onClick="handleCancel" buttonType="button" v-if="cancel" :disabled="true">取消</v-button>
            <v-button @onClick="handleClick" buttonType="button" v-if="confirm" :style="{'margin-left': '15px'}" :disabled="true">确定</v-button>
          </v-space>
        </slot>

      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  props: {
    action: {
      type: String,
      default: "add"
    },
    // 标题
    className: {
      type: String,
      default: ""
    },    
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 是否有低部
    hasfooter: {
      type: Boolean,
      default: true
    },
    // 是否展示
    show: {
      type: Boolean,
      default: false
    },
    // 是否有确认按钮
    confirm: {
      type: Boolean,
      default: true
    },
    // 是否有取消按钮
    cancel: {
      type: Boolean,
      default: true
    },
    // 宽度
    width: {
      type: String,
      default: '450px'
    },
    // 高度
    height: {
      type: String,
      default: '380px'
    },
      // 高度
    conheight: {
      type: String,
      default: '150px'
    },
    close: {
      type: Boolean,
      default: true
    },
        // 列表初始化数据
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
        // 数据
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
        // 接口
    api: {
      type: String,
      default: ""
    },
  },

  emits: ['update:show', 'submit'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const top = ref(`${document.documentElement.clientHeight/2-parseInt(props.height)/2}px`)
    const left = ref(`${document.documentElement.clientWidth/2-parseInt(props.width)/2}px`)
    const isShow = ref(props.show)

    // 监听弹窗变量
    watch([isShow], (newValues, prevValues) => {
      context.emit('update:show', false)
    })

    // 初始化数据
    async function init(param: any) {
      let data = {}
      if (props.action === 'edit') {
        await store.dispatch('common/Fetch', {
          api: props.api || "detail",
          data: {
            ...props.data,
            ...param
          }
        }).then(res => {
          data = res.result
        })
      }
      return data
    }


    function handleCancel() {
      context.emit('update:show', false)
    }

    function handleClick() {
      context.emit('submit')
    }

    return {
      handleClick,
      handleCancel,
      init,
      top,
      left,
      isShow
    }
  }
})
</script>

<style scoped>
.animation-fadein {
  -webkit-animation: fadeInUp .5s .2s ease both;
  -moz-animation: fadeInUp .5s .2s ease both;
}

@-webkit-keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(20px)
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0)
  }
}

@-moz-keyframes fadeInUp {
  0% {
    opacity: 0;
    -moz-transform: translateY(20px)
  }

  100% {
    opacity: 1;
    -moz-transform: translateY(0)
  }
}
</style>
