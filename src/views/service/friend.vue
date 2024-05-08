<template>
<div class="container w1100 mb25" style="min-height: 600px">
  <div class="module-wrap">
    <div class="module-head">
      <span class="bold">友情链接</span>
    </div>
    <div class="module-content plr15">
      <div>
        <ul class="clearfix">
          <li class="col-md-2 p5 nowrap" style="height: 40px;" :title="item.nickname" v-for="(item, index) in dataList" :key="index" @click="handleClick(item)">
            {{item.name}}
          </li>
        </ul>
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
    const coding: any = codings.links
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
        data: {
          coding,
          website: 'dongblog.com',
          ...params
        }
      }).then((res) => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any) {
      window.open(param.url)
    }

    onMounted(() => {
      init()
    })

    return {
      query,
      dataList,
      init,
      handleClick
    }
  }
})
</script>
