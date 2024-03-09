<template>
<div class="module-wrap mb15">
  <div class="module-head bd-0 p20 font16">
    日志
    <span class="pointer right font12" @click="handlePrev">返回日志列表</span>
  </div>
  <div class="module-content form-wrap-box detail" style="padding: 25px 50px !important; min-height: 500px;" :style="{background: data.paper}">
    <div class="article nobg" v-if="loading" >
      <div class="article-head">
        <h2 class="mb15" :style="[data.style]">{{data.title}}</h2>
        <div class="author font12 cl-999">
          <span class="mr25">标签：{{data.tag.join(',')}}</span>
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
            <a title="阅读" class="cl-999">阅读({{data.visit}})</a>
          </span>
        </p>
      </div>
      <div class="related">
        <p class="preg pointer mb10" @click="handleclick(data.prev_id)">阅读上一篇：{{data.prev_title}}</p>
        <p class="next pointer" @click="handleclick(data.next_id)">阅读下一篇：{{data.next_title}}</p>
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
  useStore,
  useRoute,
  useRouter,
  getUid
} from '@/utils'

export default defineComponent({
  name: 'ArticleView',
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const data: any = ref({})
    const configData: any = ref({})
    const loading: any = ref(false)

    // 初始化数据
    function init() {
      loading.value = false
      store.dispatch('common/Fetch', {
        api: 'journalView',
        data: {
          id: route.query.id
        }
      }).then(res => {
        loading.value = true
        data.value = res.result
        data.value.style = JSON.parse(res.result.style)
      })
    }

    function handleclick(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/journal?item=view&id=${param}`
      }))
      setTimeout(() => {
        window.scrollTo(0, 0)
        init()
      }, 100)
    }

    function handlePrev() {
      router.go(-1)
    }

    onMounted(() => {
      init()
    })
    return {
      data,
      configData,
      handleclick,
      loading,
      handlePrev
    }
  }
})
</script>
