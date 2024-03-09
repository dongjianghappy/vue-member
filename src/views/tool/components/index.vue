<template>
<div class="container w1100 bg-white mb25" style="min-height: 600px">
  <div class="module-wrap">
    <div class="module-head">
      <span class="bold">常用工具</span>
    </div>
    <div class="module-content plr15">
      <div style="overflow: auto;">
        <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
          <div class="p15 align_center" style=" background: var(--card-background); border-radius: 8px;">
            <div class="ptb10 font6" @click="handleClick(item.value)">
              {{item.name}}
            </div>
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
  onMounted,
  computed,
  useStore,
  useRoute,
  ref,
  codings,
  durationTrans,
  useRouter
} from '@/utils'

export default defineComponent({
  name: 'HomeView',
  components: {
    
  },
  setup(props, context) {
    const coding: any = codings.sound
    const store = useStore();
    const route = useRoute();
    const router = useRouter()
    const drag: any = ref(false)
    const duration: any = ref('0:00')
    const secondssss: any = ref('0:00')
    let query: any = computed(() => route.query || "");
    const dataList: any = ref([{
      name: '视频提取',
      value: 'video'
    }])

    // function init() {
    //   store.dispatch('common/Fetch', {
    //     api: "ArticleList",
    //     data: {
    //       coding: coding.art,
    //       page: 1,
    //       pagesize: 20
    //     }
    //   }).then(res => {
    //     dataList.value = res.result.list
    //   })
    // }

    function handleClick(param: any, grade: any) {

      router.push(`/tool?item=${param}`)
    }

    onMounted(() => {
      // init()
    })

    return {
      coding,
      query,
      dataList,
      handleClick
      // init
    }
  }
})
</script>
