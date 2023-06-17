<template>
<div class="drawer-wrap" :class="{'drawer-open': show}" :style="`top: ${style.top || 64}px`">
  <v-mask v-show="show" v-model:isShow="isShow" />
  <div class="drawer align_left" :style="{width: `${style.width || 700}px`, right: show ? '0px' : `-${style.width || 700}px`}">
    <div class="module-wrap relative" :style="`height:${style.height || '100%'}`">
      <div class="module-head" v-if="title">{{title}}
        <span class="right">
          <slot name="extra"></slot>
        </span>
      </div>
      <div class="module-content absolute plr25" :style="`width: 100%; top: ${title ? '65px;' : '0px'}; bottom: ${hasfooter ? '55px;' : '0px' }; overflow-y: auto;`">
        <slot name="content"></slot>
      </div>
      <div class="module-foot absolute align_right" style="bottom: 0" v-if="hasfooter">
        <v-space>
          <slot name="foot">
            <buttom class="btn btn-default" @click="cancel">取消</buttom>
            <buttom class="btn btn-default" @click="submit">确定</buttom>
          </slot>
        </v-space>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  getCurrentInstance,
  watch,
  ref,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Drawer',
  props: {
    style: {
      type: Object,
      default: () => {
        return {
          top: "64",
          width: "700",
          height: "100%"
        }
      }
    },
    action: {
      type: String,
      default: "add"
    },
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    hasfooter: {
      type: Boolean,
      default: true
    },
    param: {
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
    api: {
      type: String,
      default: ""
    },
    submitApi: {
      type: Object,
      default: ""
    },
    submit: {
      type: Function,
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  emits: ['update:show'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
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

    function submit(params: any) {
      if (props.submit) {
        props.submit({
          cancel: cancel,
          message: () => {}
          // message: proxy.$hlj.message({
          //   msg: props.action !== "add" ? "编辑成功" : "新增成功"
          // })
        })
      } else {

        if(props.param.markdown){
          props.param.content = props.param.markdown ? marked.parse(props.param.markdown) : ""
        }

        store.dispatch('common/Fetch', {
          api: props.action !== "add" ? props.submitApi['update'] || 'update' : props.submitApi['insert'] || "insert",
          data: {
            ...props.data,
            ...props.param
          }
        }).then(res => {
          proxy.$hlj.message({
            msg: "编辑成功"
          })
          props.render()
          cancel()
        })
      }
    }
    
    function cancel() {
      context.emit('update:show', false)
    }

    return {
      isShow,
      init,
      submit,
      cancel
    }
  }
})
</script>
