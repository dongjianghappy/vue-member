<template>
<v-graph :data="detail" :save="save" @close="handleClose" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  useRoute,
  useRouter,
  watch,
  getUid
} from '@/utils'

export default defineComponent({
  name: 'ArticleView',
  props: {
    channel: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:show'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const detail: any = ref({})
    const loading: any = ref(false)

    // 监听
    watch(route, async (newValues, prevValues) => {
      init()
    })

    function handleClose() {
      context.emit('update:show', false)
    }

    // 初始化数据
    function init() {
      const {
        coding,
        detailApi,
        id
      } = props.data

      loading.value = false
      store.dispatch('common/Fetch', {
        api: detailApi || 'getGraph',
        data: {
          coding: coding,
          id: id
        }
      }).then(res => {
        loading.value = true
        detail.value = res.result
        detail.value.graph = JSON.parse(res.result.graph || '{}')
        detail.value.style = {}
      })
    }

    // 保存
    function save(graph: any) {
      const {
        id
      } = detail.value

      const {
        coding,
        updateApi
      } = props.data
      const param: any = {
        id,
        graph
      }

      store.dispatch('common/Fetch', {
        api: updateApi || 'updateGraph',
        data: {
          coding: coding,
          ...param
        }
      }).then(res => {
        debugger
        proxy.$message.message({
          msg: "保存成功"
        })
      })
    }

    onMounted(() => {
      init()
    })
    return {
      handleClose,
      detail,
      loading,
      save
    }
  }
})
</script>
