<template>
<div class="module-wrap mb15">
  <div class="module-head p20">正文
    <span class="pointer ml25" @click="handlePrev">返回</span>
  </div>
  <div class="module-content form-wrap-box detail" style="padding: 25px 50px !important; min-height: 500px;">
<v-graph :data="data.graph" :save="save" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
  useStore,
  useRoute,
  codings,
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
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const data: any = ref({})
    const loading: any = ref(false)
    const channel: any = props.channel;
    const {
      art
    }: any = codings[props.channel]

    // 监听
    watch(route, async (newValues, prevValues) => {
      init()
    })

    // 初始化数据
    function init() {
      loading.value = false
      store.dispatch('common/Fetch', {
        api: 'ArticleView',
        data: {
          coding: art,
          id: route.query.id
        }
      }).then(res => {
        data.value.graph = JSON.parse(res.result.graph || '{}')
        loading.value = true
        data.value = res.result
        data.value.style = {}
        // data.value.style = JSON.parse(res.result.style)
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

    function handlePrev() {
      router.go(-1)
    }

    // 保存
    function save(graph: any) {
      const {
        id
      } = data.value

      const param: any = {
        id,
        graph
      }
      
      proxy.$hlj.loading()
      store.dispatch('common/Fetch', {
        api: 'UpdateArticle',
        data: {
          coding: art,
          ...param
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }

    onMounted(() => {
      init()
    })
    return {
      data,
      handleclick,
      loading,
      handlePrev,
      save
    }
  }
})
</script>
