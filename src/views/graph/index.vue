<template>
<div class="module-wrap m0 p0 fixed" style="top: 0px; left: 0px; bottom: 0px; width: 100%; z-index: 100000">
  <div class="module-head cl-white p20" style="background: #000">{{data.name}}
    <span>{{detail.title}} - 流程图</span>
    <span class="right" @click="handleClose">关闭</span>
  </div>

  <div class="module-content absolute p0" style="top: 50px; bottom : 0px; width: 100%;">
    <Graph :data="detail.graph" :save="save" />
  </div>
</div>
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
import Graph from '@/plugin/joint/index.vue'

export default defineComponent({
  name: 'ArticleView',
  components: {
    Graph
  },
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
      const doc: any = document
      doc.body.parentNode.style.overflowY = "auto";
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
        api: detailApi || 'ArticleView',
        data: {
          coding: coding,
          id: id
        }
      }).then(res => {
        detail.value.graph = JSON.parse(res.result.graph || '{}')
        loading.value = true
        detail.value = res.result
        detail.value.style = {}
      })
    }

    function handleclick(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/${props.channel}?item=view&id=${param}`
      }))
      setTimeout(() => {
        window.scrollTo(0, 0)
        init()
      }, 100)
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
        api: updateApi || 'UpdateArticle',
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
      handleclick,
      loading,
      save
    }
  }
})
</script>
