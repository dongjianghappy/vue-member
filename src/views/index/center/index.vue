<template>
<div class="home">
  <TalkSend />
  <TalkTabs :render="init" />
  <TalkItem :sourceData="talk.list" :isLoading="Loading" :deleteTalk="deleteTalk" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted,
  ref,
  watch,
  useStore,
  useRoute
} from '@/utils'
import TalkSend from '../components/module/talk_send.vue'
import TalkTabs from '../components/module/TalkTabs.vue'
import TalkItem from '../components/TalkItem/index.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    TalkSend,
    TalkTabs,
    TalkItem
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const talk: any = computed(() => store.getters['common/talkList']);
    const Loading: any = ref(false)
    const page = ref(1);

    // 监听弹窗变量
    watch(route, (newValues, prevValues) => {
      if (route.path === "/") {
        Loading.value = false
        init({
          page: 1,
          key: route.query.q
        })
      }
    }, {
      deep: true
    })

    function init(param: any) {
      let uid = window.location.pathname.split("/")[1]
      store.dispatch('common/Talk', {
        uid,
        ...param
      }).then((res) => {
        Loading.value = true
      })
    }

    function loadData() {
      if (document.body.clientHeight - window.scrollY <= 2000 && Loading.value === true) {
        Loading.value = false

        setTimeout(() => {
          store.dispatch('common/Talk', {
            page: talk.value.page,
            key: route.query.q
          }).then((res) => {
            Loading.value = true
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
      init({
        page: 1,
        key: route.query.q
      })
      window.addEventListener("scroll", function (e: any): void {
        if (talk.value.page <= talk.value.pageNum) {
          loadData()
        }
      })

    })
    return {
      init,
      talk,
      Loading,
      deleteTalk
    }
  },
})
</script>
