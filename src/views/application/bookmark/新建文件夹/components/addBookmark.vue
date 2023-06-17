<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />自定义字段
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="自定义字段" width="520px" height="450px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
   <div></div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
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
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function submit(cancel: any) {
      const {
        id,
        remark,
        name,
        value,
        text_type,
        explanation
      } = detail.value
      const param = {
        id,
        remark,
        name,
        value,
        text_type,
        explanation
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: 'P0000',
          ...param
        }
      }).then(res => {
        props.render()
        cancel()
      })
    }

    return {
      isShow,
      detail,
      drawer,
      submit
    }
  }
})
</script>
