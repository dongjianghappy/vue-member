<template>
<div class="container w1100 mb25" style="min-height: 600px">
  <div class="module-wrap">
    <div class="module-head">
      <span class="bold">用户专区</span>
    </div>
    <div class="module-content plr15">
      <div>
        <ul class="clearfix">
          <li class="col-md-2 p5 nowrap" style="height: 40px;" :title="item.nickname" v-for="(item, index) in dataList.list" :key="index" @click="handleClick(item.account)">
            {{item.nickname}}
          </li>
        </ul>
      </div>
      <div class="mt25 align_center" v-if="dataList.total > 10">
        <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
      </div>
    </div>
  </div>

</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  useRoute,
  useRouter,
  ref,
  codings,
  getUid
} from '@/utils'

export default defineComponent({
  name: 'HomeView',
  components: {
    
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const router = useRouter();
    const coding: any = codings.sound
    const store = useStore();
    const route = useRoute();
    let query: any = computed(() => route.query || "");
    const dataList: any = ref({})

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 360
      }

      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        api: 'userZone',
        data: {
          ...params
        }
      }).then((res) => {
        dataList.value = res.result
      })
    }

    function handleClick(uid: any) {
      if (uid === undefined) {
        return
      }
      router.push(`${proxy.const.u}${uid}/home`)
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      query,
      dataList,
      init,
      handleClick
    }
  }
})
</script>
