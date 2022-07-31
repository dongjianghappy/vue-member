<template>
<div class="module-wrap mb15">
  <div class="module-head p20">正文
    <span class="pointer ml25" @click="handlePrev">返回</span>
  </div>
  <div class="module-content form-wrap-box detail" style="padding: 25px 50px !important; min-height: 500px;">
    <div class="article" v-if="loading">
      <div class="article-head">
        <h2 class="mb15" :style="[data.style]">{{data.title}}</h2>
        <div class="author font12 cl-999">
          <span class="mr25">标签：{{data.tag}}</span>
          <span class="mr25">{{data.times}}</span>
        </div>
      </div>
      <div class="article-content font16 pt25" style="line-height: 25px">
        <div v-html="data.content"></div>
      </div>
      <div class="ptb25">
        <p>
          <span class="operating f-fr font12 cl-999">
            <a class="cl-999">分类：{{data.parent || '未分类'}}</a> |
            <a title="阅读" class="cl-999">阅读({{data.visit}})</a> |
            <a title="评论" class="cl-999">评论({{data.comment}})</a>
          </span>
        </p>
      </div>
      <div class="related">
        <p class="preg pointer mb10" @click="handleclick(data.prev_id)" v-if="data.prev_title">阅读上一篇：{{data.prev_title}}</p>
        <p class="next pointer" @click="handleclick(data.next_id)" v-if="data.next_title">阅读下一篇：{{data.next_title}}</p>
      </div>
    </div>
    <div v-else>正在加载！</div>
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

    function handlePrev(){
      router.go(-1)
    }

    onMounted(() => {
      init()
    })
    return {
      data,
      handleclick,
      loading,
      handlePrev
    }
  }
})
</script>
