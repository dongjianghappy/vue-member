<template>
<div class="drawer-wrap" :class="{'drawer-open': show}" :style="`top: ${top}px`">
  <v-mask v-show="show" v-model:isShow="isShow"></v-mask>

  <div class="drawer align_left" :style="{width: `${width}px`, right: show ? '0px' : `-${width}px`}">
    <div class="module-wrap relative" :style="`height:${height}`">
      <div class="module-head" v-if="title">{{title}}
        <span class="right">
          <slot name="extra"></slot>
        </span>
      </div>
      <div class="module-content absolute plr25" :style="`width: 100%; top: ${title ? '65px;' : '0px'}  bottom: 55px; overflow-y: auto;`">
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
  defineComponent,
  getCurrentInstance,
  watch,
  ref,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Drawer',
  props: {
    // 操作类型值有: eidt、add
    action: {
      type: String,
      default: "add"
    },
    // 是否展示
    show: {
      type: Boolean,
      default: false
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
    // 定位
    top: {
      type: String,
      default: "0"
    },
    // 宽度
    width: {
      type: String,
      default: "700"
    },
    height: {
      type: String,
      default: "100%"
    },
    param: {
      type: Object,
      default: () => {
        return {}
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
    submitApi: {
      type: Object,
      default: ""
    },
    submit: {
      type: Function,
    },
    // 列表初始化数据
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  emits: ['onClick', 'update:show'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
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

    // 确认按钮
    function submit(params: any) {

      if (props.submit) {
        props.submit({
          cancel: cancel()
        })
      } else {
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

    // 取消按钮
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
