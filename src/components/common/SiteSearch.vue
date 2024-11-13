<template>
<div class="talk-search" @click.stop>
  <div class="search-box">
    <i class="iconfont icon-search"></i>
    <input type="text" placeholder="输入搜素内容" v-model="content" @focus="handleFocus" @input="handleInput" @keypress.enter="handleSearch">
    <div class="relative">
      <span v-if="content" class="absolute pointer" style="top: 12px; right: 45px" @click="handleClear">
        <i class="iconfont icon-close font12" />
      </span>
      <div class="search-button pointer" v-if="content" @click="handleSearch">搜素</div>
    </div>

  </div>
</div>
<div class="search-wrap" @click.stop v-if="search">
  <div class="module-wrap" v-if="module.match_search == '1'">
    <div class="module-content p0">
      <div style="display: unset">
        <div class="item-thum-wrap" style="line-height: 25px;" v-for="(item, index) in searchData" :key="index">
          <div class="item-title relative"><a @click="handleSearch(item.word)" class="nowrap p0 font12 align_left" style="height: 25px;">{{item.word}}</a></div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
  <div class="module-wrap" style="background: none" v-if="module.history_search == '1'">
    <div class="module-head">
      历史搜素
      <span class=" cl-999 right" v-if="isEdit">
        <span @click="deleteWord">全部删除</span> |
        <span @click="() => isEdit = false">完成</span>
      </span>
      <span class=" cl-999 right" style="margin-top: -7px;" v-else><i class="iconfont icon-recycle" @click="() => isEdit = true" /></span>

    </div>
    <div class="module-content p15">
      <div class="label label-round mt15 font12">
        <span class="word" v-for="(item, index) in historyWords" :key="index">
          <span class="cursor" @click="handleSearch(item.word)">{{item.word}}</span>
          <span v-if="isEdit"><i class="iconfont icon-close font12" @click="deleteWord(item)" /></span>
        </span>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRouter,
  useRoute,
  useStore,
  getQuery,
  computed,
  onMounted
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Search',
  props: {
    search: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:search'],
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const content: any = ref("")
    const getQuerys: any = getQuery
    const searchData: any = ref([])
    const historyWords: any = ref([])
    const isEdit: any = ref(false)
    const module = computed(() => store.getters['user/system'].search);

    content.value = route.query.q

    function handleSearch(key: any) {

      // 如果是字符串类型，标识点选搜索
      if (typeof (key) === 'string') {
        content.value = key
      }
      if (!content.value) {
        return
      }
      isEdit.value = false
      context.emit('update:search', false)

      let query = ""
      if (getQuerys().type) {
        query = `?type=${getQuerys().type}${content.value ? '&q='+content.value : ''}`
      } else {
        query = `?q=${content.value}`
      }

      router.push(`/search${query}`)
    }

    function handleFocus(e: any) {
      context.emit('update:search', true)
      getHistoryWord()
    }

    function handleInput(e: any) {
      if (!content.value) {
        searchData.value = []
        return
      }
      store.dispatch('common/Fetch', {
        api: "relatedWords",
        data: {
          word: content.value
        }
      }).then(res => {
        searchData.value = res.result
      })
    }

    function getHistoryWord() {
      store.dispatch('common/Fetch', {
        api: "historyWords",
        data: {
          word: content.value
        }
      }).then(res => {
        historyWords.value = res.result
      })
    }

    function deleteWord(item: any) {
      const param: any = {}
      if (item) {
        param.id = item.id
      }
      store.dispatch('common/Fetch', {
        api: "removehistoryWord",
        data: {
          word: content.value,
          ...param
        }
      }).then(res => {
        getHistoryWord()
      })
    }

    function handleClear() {
      content.value = ""
    }

    function close(e: any) {
      context.emit('update:search', false)
    }

    onMounted(() => {
      VueEvent.on("search", (param) => {
        handleSearch(param)
      })
      document.addEventListener("click", close);
    })

    return {
      handleSearch,
      handleFocus,
      searchData,
      content,
      close,
      handleClear,
      handleInput,
      historyWords,
      isEdit,
      deleteWord,
      module
    }
  }
})
</script>

<style lang="less" scoped>
.talk-search {
  display: flex;

  .search-box {
    display: flex;
    flex: 1;
    background: var(--input-background);
    border-radius: 50px;
    height: 34px;
    padding: 0 10px;

    i {
      margin: 0;
      margin-right: 5px;
      padding-top: 7px;
      width: 25px;
      font-size: 22px;
    }

    input {
      background: none;
      max-width: 100%;
      border: 0;
      border-radius: 0;
      padding: 0;
      font-size: 14px;
    }
  }

  .search-button {
    width: 50px;
    line-height: 34px;
    text-align: center;
  }
}

.search-wrap {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: var(--module-background);
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  width: 100%;
  height: auto;

  .label {
    .word {
      display: inline-block;
      border-radius: 4px;
      line-height: 16px;
      height: 25px;
      padding: 5px 10px;
      background: var(--label-background);
      margin-right: 10px;
      margin-bottom: 10px;
      color: #999;
      &:hover{
        background: var(--link-hover-background);
      }
    }
  }
}
</style>
