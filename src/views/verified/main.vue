<template>
<div class="container bg-white w1100 relative" style="height: 650px;">
  <div class="verified-box p25" style="right: 65px; top: 50%; margin-top: -200px">
    <div class="font24">蓝V认证</div>
    <div class="mt25">
      <div class="mb10 p10 font14 cl-666 align_center" style="background: #ddd; border-radius: 50px;">立即申请企业认证</div>
      <div class="font12">开启微博企业认证，立享广告、营销、运营、数据四大特权服务。</div>
    </div>
    <div class="mt25">
      <div @click="handleClick()" class="mb10 p10 font14 cl-666 align_center" style="background: #ddd; border-radius: 50px;">申请个人</div>
      <div class="font12">微博官方还提供政府、媒体等其他机构团体认证方式，或个人身份、兴趣、自媒体等认证</div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  useRouter,
  computed,
  ref,
  onMounted,
  getUid,
  watch
} from '@/utils'
import Send from './components/send.vue'
import List from './components/list.vue'
import {
  feedback
} from '@/assets/const'

export default defineComponent({
  name: 'MessageBoardView',
  components: {
    Send,
    List
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter()
    const isTome: any = ref(true);
    let dataList: any = ref({})
    const loading: any = ref(false)

    watch(() => route.query.item, () => {
      isTome.value = route.query.item === 'tome' ? true : false
    })

    function init(param: any = {}) {
      loading.value = false

      const params: any = {
        item: route.query.item,
        uid: getUid(),
        page: 1,
        pagesize: 2
      }

      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        api: "userMessageBoard",
        data: {
          ...params
        }
      }).then(res => {
        loading.value = true
        dataList.value = res.result
      })
    }

    function handleClick(){
      router.push('?item=institution')
    }

    onMounted(init)

    return {
      route,
      isTome,
      dataList,
      loading,
      init,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.open-text {
  position: absolute;
  width: 400px;
  height: 300px;
  color: #fff;
}

.verified-box {
  background: var(--label-background);
  position: absolute;
  border-radius: 8px;
  width: 400px;
  height: 300px;
}
</style>
