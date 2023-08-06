<template>
<div class="home">
  <TalkTabs ref="talktabs" :data="tabs" :render="init" :mod="{tab: 'mod', value: query.mod}" />
  <Source :dataList="sourceList" v-if="query.mod === 'source'" />
  <Tech :dataList="techList" v-else-if="query.mod === 'tech'" />
  <Picture :dataList="pictureList" v-else-if="query.mod === 'picture'" />
  <Funny :dataList="funnyList" v-else-if="query.mod === 'funny'" />
  <Notes :dataList="notesList" v-else-if="query.mod === 'notes'" />
  <website :dataList="websiteList" v-else-if="query.mod === 'website'" />
  <Blog :dataList="blogList" v-else-if="query.mod === 'blog'" />
  <Words :dataList="wordsList" v-else-if="query.mod === 'words'" />
  <TalkItem :sourceData="talk.list" :deleteTalk="deleteTalk" v-else />
  <v-loding v-if="!loading" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  getUid,
  codings
} from '@/utils'
import TalkTabs from '../components/module/TalkTabs.vue'
import TalkItem from '../components/TalkItem/index.vue'
import Source from '../components/source/index.vue'
import Picture from '../components/picture/index.vue'
import Funny from '../components/funny/index.vue'
import Tech from '../components/tech/index.vue'
import Notes from '../components/notes/index.vue'
import website from '../components/website/index.vue'
import Blog from '../components/blog/index.vue'
import Words from '../components/words/index.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    TalkTabs,
    TalkItem,
    Source,
    Picture,
    Funny,
    Tech,
    Notes,
    website,
    Blog,
    Words
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings
    const module = computed(() => store.getters['user/config_talk'].personal_center);
    const tabs: any = computed(() => store.getters['user/config_talk'].talk_tabs);
    const talk: any = computed(() => store.getters['talk/talkList']);
    const sourceList: any = computed(() => store.getters['talk/sourceList']);
    const pictureList: any = computed(() => store.getters['talk/pictureList']);
    const funnyList: any = computed(() => store.getters['talk/funnyList']);
    const techList: any = computed(() => store.getters['talk/techList']);
    const notesList: any = computed(() => store.getters['talk/notesList']);
    const websiteList: any = computed(() => store.getters['talk/websiteList']);
    const blogList: any = computed(() => store.getters['talk/blogList']);
    const wordsList: any = computed(() => store.getters['talk/wordsList']);

    const talktabs: any = ref(null)
    const loading: any = ref(false)
    const page = ref(1);
    const query: any = ref(route.query)

    const slideshow = computed(() => {
      let slides: any = store.getters['common/slideshow']
      let arr: any = {}
      for (let key in slides) {
        if (key === 'slideshow_11') {
          arr = slides[key]
        }
      }
      debugger
      return arr
    });



    // 监听弹窗变量
    watch(route, (newValues, prevValues) => {
      if (route.path === "/") {
        loading.value = false
        init({
          page: 1,
          key: route.query.q
        })
      }
      query.value = route.query
    }, {
      deep: true
    })

    function init(param: any) {
      debugger
      let talk_arr = ['ori', 'img', 'art', 'vdo']
      let module_arr = ['source', 'picture', 'tech', 'funny', 'notes', 'website', "words"]
      let other_arr = ['download', 'blog', 'hanyu']
      let dispatch = 'Talk'
      let obj: any = {}
      
      if(module_arr.indexOf(param.type) > -1){
        dispatch = 'Module'
        obj.state = `${param.type}List`
        param.coding = coding[param.type].art
      }else if(other_arr.indexOf(param.type) > -1){
        debugger
        if(param.type === 'hanyu'){
          dispatch = 'commonSenseQuotes'
        }else{
          dispatch = param.type
        }
        
      }
      debugger
      store.dispatch(`talk/${dispatch}`, {
        ...obj,
        data: {
          page: 1,
          pagesize: '50',
          uid: getUid(),
          ...param
        }
      }).then((res) => {
        loading.value = true
      })

    }

    function loadData() {
      if (document.body.clientHeight - window.scrollY <= 2000 && loading.value === true) {
        loading.value = false

        setTimeout(() => {
          store.dispatch('talk/Talk', {
            page: talk.value.page,
            key: route.query.q
          }).then((res) => {
            loading.value = true
          })
        }, 1000)
      }
    }

    function deleteTalk(id: any) {
      store.dispatch('common/Fetch', {
        api: 'deleteTalk',
        data: {
          id
        }
      }).then(res => {
        let index = talk.value.list.findIndex((item: any) => item.id === id)
        talk.value.list.splice(index, 1)
      })

    }

    onMounted(() => {
      // 在没有置顶页面时，初始化页面进入到默认tabs项中
      if (!query.value.mod) {
        const defaultTab = tabs.value ? tabs.value.filter((item: any) => item.default === '1') : []
        if(defaultTab.length > 0){
          talktabs.value.handelClick(defaultTab[0].value)
        }
        return
      }

      init({
        type: query.value.mod,
        page: 1,
        key: route.query.q,
      })
      // window.addEventListener("scroll", function (e: any): void {
      //   if (talk.value.page <= talk.value.pageNum) {
      //     loadData()
      //   }
      // })

    })
    return {
      module,
      query,
      talktabs,
      tabs,
      init,
      talk,
      loading,
      deleteTalk,
      sourceList,
      pictureList,
      funnyList,
      techList,
      notesList,
      websiteList,
      blogList,
      wordsList,
      slideshow
    }
  },
})
</script>
