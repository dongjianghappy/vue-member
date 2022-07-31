<template>
<div class="home">
  <TalkSend />
  <TalkTabs ref="talktabs" :data="tabs" :render="init" :mod="{tab: 'mod', value: query.mod}" />
  <Download :dataList="downloadList" v-if="query.mod === 'download'" />
  <Notes :dataList="notesList" v-else-if="query.mod === 'notes'" />
  <website :dataList="websiteList" v-else-if="query.mod === 'website'" />
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
  getUid
} from '@/utils'
import TalkSend from '../components/module/talk_send.vue'
import TalkTabs from '../components/module/TalkTabs.vue'
import TalkItem from '../components/TalkItem/index.vue'
import Download from '../components/download/index.vue'
import Notes from '../components/notes/index.vue'
import website from '../components/website/index.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    TalkSend,
    TalkTabs,
    TalkItem,
    Download,
    Notes,
    website
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const module = computed(() => store.getters['user/config_talk'].personal_center);
    const tabs: any = computed(() => store.getters['user/config_talk'].talk_tabs);
    const talk: any = computed(() => store.getters['talk/talkList']);
    const downloadList: any = computed(() => store.getters['talk/downloadList']);
    const notesList: any = computed(() => store.getters['talk/notesList']);
    const websiteList: any = computed(() => store.getters['talk/websiteList']);
    const talktabs: any = ref(null)
    const loading: any = ref(false)
    const page = ref(1);
    const query: any = ref(route.query)

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
      let uid = window.location.pathname.split("/")[1]
      let dispatch = !param.type || param.type === 'ori' || param.type === 'ori' ? 'Talk' : param.type
      store.dispatch(`talk/${dispatch}`, {
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
        const defaultTab = tabs.value.filter((item: any) => item.default === '1')
        talktabs.value.handelClick(defaultTab[0].value)
        return
      }

      init({
        type: query.value.mod,
        page: 1,
        key: route.query.q,
      })
      window.addEventListener("scroll", function (e: any): void {
        if (talk.value.page <= talk.value.pageNum) {
          loadData()
        }
      })

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
      downloadList,
      notesList,
      websiteList
    }
  },
})
</script>
