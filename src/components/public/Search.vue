<template>
<div class="search search-waopss">
  <div class="searchinput">
    <input type="text" placeholder="搜素你想要的内容" v-model="content" @focus="handleFocus" @keypress.enter="search" style="width: 265px;">
  </div>
  <div class="searchbtn" style="padding: 7px;">
    <a style="padding:0px" @click="search"><i class="iconfont icon-search"></i></a>
  </div>
  <span v-if="content" class="absolute pointer" style="top: 12px; right: 37px" @click="handleClear">
    <i class="iconfont icon-close font12" />
  </span>
  <div v-if="showflag" class="absolute" style="background: #fbfcff; box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%); top: 35px;     border-radius: 3px;
    border: 1px solid #e8eaec; width: 100%; height: auto">
    <div class="module-wrap" >
     
      <div class="module-content p0">
        <div style="display: unset">
          <div class="item-thum-wrap" style="line-height: 25px;" v-for="(item, index) in searchData" :key="index">
            <div class="item-title relative"><a @click="search(item.name)" class="nowrap p0 font12 align_left" style="height: 25px;">{{item.name}}</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  getQuery
} from '@/utils'
import {
  useRouter,
  useRoute,
  onBeforeRouteUpdate
} from 'vue-router'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'v-Search',
  components: {

  },
  mounted(){
    document.addEventListener("click", this.close);
  }, 
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const content: any = ref("")
    const showflag: any =  ref(false)
    const getQuerys: any = getQuery
    const searchData = [
      {
        name: 'HTML5'
      },
      {
        name: '瀑布流'
      },
      {
        name: '音乐播放器'
      },
      {
        name: '时间轴'
      },
      {
        name: '调色板'
      },
      {
        name: '九宫格'
      },
      {
        name: '报价表'
      }
    ]

    content.value = route.query.q

    function search(key: any) {
      
      // 如果是字符串类型，标识点选搜索
      if(typeof(key) === 'string'){
        content.value = key
      }
      if (!content.value) {
        return
      }
      showflag.value = false
      router.push(`/search?type=${getQuerys().type ? getQuerys().type : 'talk'}&q=${content.value}`)
    }

    function handleFocus(e: any) {
      showflag.value = true
    }

    function handleClear(){
      content.value = ""
    }
    function close(e: any){
      // if(e.target.className.indexOf('search-waopss') > -1 || e.target.parentNode.className.indexOf('search-waopss') > -1  || e.target.parentNode.className.indexOf('searchinput') > -1){
      //   return
      // }
      showflag.value = false

    }
    return {
      search,
      handleFocus,
      searchData,
      showflag,
      content,
      close,
      handleClear
    }
  }
})
</script>
