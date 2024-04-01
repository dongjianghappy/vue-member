<template>
  <div class="home">
    <TalkTabs ref="talktabs"
              field="category"
              :data="[{name: '全部', value: ''}, {name: '图集', value: 'img'}, {name: '视频', value: 'video'}, {name: '文本', value: 'art'}]"
              :render="init"
              :query="{tab: 'mod', value: route.query.mod || ''}" />
    <div class="p10 align_center"
         style="color: #808080"
         v-if="channel.checked_num">您有{{channel.checked_num}}条微博内容待审核。</div>
    <TalkItem :sourceData="channel.talk"
              :deleteTalk="deleteTalk"
              :render="init" />
    <!-- <v-loding v-if="!loading" /> -->
    <div class="con-list"
         v-if="channel.talk.length === 0">
      <div class="con-wrap"
           style=" padding-top:100px; height:350px; text-align: center;">
        <p>你还没有收藏任何作品呢！</p>
        <p style="font-size: 12px; color: #999;">当你发现有意思的、有价值的作品时，赶紧收藏下来哦！</p>
      </div>
    </div>
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
import TalkTabs from '../index/components/module/TalkTabs.vue'
import TalkItem from '../index/components/TalkItem/index.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    TalkTabs,
    TalkItem
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings
    const module = computed(() => store.getters['user/config_talk'].personal_center);
    const tabs: any = computed(() => store.getters['user/config_talk'].talk_tabs);
    const talk: any = computed(() => store.getters['talk/talkList']);
    const channel: any = computed(() => store.getters['talk/channel']);
    const talktabs: any = ref(null)
    const loading: any = ref(false)
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

    function init(param: any = {}) {
      loading.value = false
      let module_arr = ['talk', 'source', 'article', 'picture', 'tech', 'funny', 'notes', 'questions', 'website', "words"]
      let other_arr = ['download', 'blog', 'hanyu']
      let dispatch = 'Talk'
      let obj: any = {}

      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)

      store.dispatch(`talk/comprehensive`, {
        state: 'talk',
        data: {
          uid: getUid(),
          coding: coding['talk'].art,
          list_id: '1',
          ...params
        }
      }).then((res) => {
        loading.value = true
      })
    }

    function loadData() {
      if (loading.value === true) {
        loading.value = false
        setTimeout(() => {
          init({
            type: query.value.mod,
            page: parseInt(channel.value.page) + 1,
            key: route.query.q,
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
      window.addEventListener("scroll", function (e: any): void {
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        if (document.documentElement.scrollTop > scrollHeight - window.innerHeight && channel.value.page < channel.value.pages) {
          loadData()
        }
      })

      init()
    })
    return {
      route,
      module,
      talktabs,
      tabs,
      init,
      talk,
      loading,
      deleteTalk,
      channel
    }
  }
})
</script>
