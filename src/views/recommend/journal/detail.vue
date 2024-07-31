<template>
<div class=" form-wrap-box detail p25" style="min-height: 500px;" :style="{background: detail.paper}">
  <div class="article p0 nobg" v-if="loading">
    <div class="article-head">
      <h2 class="mb15" :style="[detail.style]">{{detail.title}}</h2>
      <span class="pointer right font12" @click="handlePrev">返回日志列表</span>
      <div class="author font12 cl-999">
        <span class="mr25">标签：{{detail.tag.join(',')}}</span>
        <span class="mr25">{{detail.times}}</span>
      </div>
    </div>
    <div class="article-content font16 pt25" style="line-height: 25px">
      <div v-html="detail.content"></div>
    </div>
    <div class="ptb25">
      <p>
        <span class="operating f-fr font12 cl-999">
          <a class="cl-999">分类：{{detail.parent || '未分类'}}</a> |
          <a title="阅读" class="cl-999">阅读({{detail.visit}})</a>
        </span>
      </p>
    </div>
    <div class="related">
      <p class="preg pointer mb10" @click="handleclick(detail.prev_id)">阅读上一篇：{{detail.prev_title}}</p>
      <p class="next pointer" @click="handleclick(detail.next_id)">阅读下一篇：{{detail.next_title}}</p>
    </div>
  </div>
  <div v-else>正在加载！</div>
</div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useStore,
  useRoute,
  useRouter
} from '@/utils'

const store = useStore()
const route = useRoute();
const router = useRouter();
const detail: any = ref({})
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
    detail.value = res.result
  })
}

function handlePrev() {
  router.go(-1)
}
onMounted(() => {
  init()
})
</script>
