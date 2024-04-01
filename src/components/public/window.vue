<template>
<transition>
  <div class="drawer-wrap align_left" :class="{'drawer-open': show}" style="top: 0">
    <v-mask v-show="show" />
    <template v-if="show">
      <div class="layer relative" :class="[className]" @click.stop style=" background: #191919; left: 534.5px; display: block; z-index: 9001; opacity: 1;" :style="{width: `${style.width || 450}px`, height: `${style.height || 380}px`, top: window.top, left: window.left}">
        <span class="layer-close" @click="handleCancel" style=" top: -35px; right: -35px;"><i class="iconfont icon-close"></i></span>
        <slot name="content"></slot>
      </div>
    </template>
  </div>
</transition>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Dialog',
  props: {
    style: {
      type: Object,
      default: () => {
        return {
          width: "450",
          height: "380"
        }
      }
    },
    contentStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    action: {
      type: String,
      default: "add"
    },
    className: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    hasfooter: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: true
    },
    cancel: {
      type: Boolean,
      default: true
    },
    close: {
      type: Boolean,
      default: true
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    api: {
      type: String,
      default: ""
    },
  },
  emits: ['update:show', 'submit'],
  setup(props, context) {
    const store = useStore();
    const window = {
      top: `${document.documentElement.clientHeight/2-parseInt(props.style.height)/2}px`,
      left: `${document.documentElement.clientWidth/2-parseInt(props.style.width)/2}px`
    }
    const isShow = ref(props.show)

    watch([isShow], (newValues, prevValues) => {
      context.emit('update:show', false)
    })

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

    function handleClick() {
      context.emit('submit')
    }

    function handleCancel() {
      context.emit('update:show', false)
    }

    return {
      isShow,
      window,
      handleClick,
      handleCancel,
      init
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
