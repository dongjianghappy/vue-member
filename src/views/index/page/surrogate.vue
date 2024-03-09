<template>
<div class="container w1100 clearfix">
  <div class="module-wrap">
    <div class="module-content basic-info">
      <div class="font20 bold">帮上置顶</div>
      <div class="module-content">
        <div class="flex mb25 p25" style="background: #f7f8fa">
          <div class="mr20" style="width: 120px; height: 120px">
            <img :src="detail.image && detail.image[0]" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" class="radius-8" style=" width: 100%; height: auto; cursor: zoom-in;" />  
          </div>
          <div style="flex: 1">
            <div>{{detail.summary}}</div>
            <div class="mt5 font12">{{detail.nickname}}的微博</div>
            </div>
        </div>
        <div class="mb15">帮TA的这条微博上头条</div>
        <div class="mb30">
          <div class="mb10">置顶时长</div>
          <div class="mb25 flex">
            <div class="btn btn-default mr10" style="flex: 1" v-for="(item, index) in time" :key="index">{{item}}</div>
          </div>
          <div class="ptb15 align_right" style="border-top: 1px #ddd solid">
            金币：123
          </div>
        </div>

        <div class="mb30">
          <div class="mb10">我的昵称置于推荐区
            <span class="right">
              <v-switch :data="{ item: {}, field: ''}" api="userSettinng" @toggle="getValue" className="right" :auth="true" />
            </span>
          </div>
          <div class="ptb15 align_right" style="border-top: 1px #ddd solid">
            金币：123
          </div>
        </div>
        <div class="mb25" style="height: 32px; line-height: 32px;
">
          总计：32123金币

          <span class="btn-submit right">去支付</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import router from '@/router';
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  onMounted,
  codings,
  useRoute
} from '@/utils'

export default defineComponent({
  name: 'AsideView',
  components: {

  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store: any = useStore()
    const route: any = useRoute()
    const isShow: any = ref(false)
    const userInfo: any = computed(() => store.getters['user/userInfo']);
    const detail: any = ref({})
    const coding: any = codings.service.announcement
    const time = ['1小时', '2小时', '3小时', '4小时', '5小时', '6小时', '12小时', '24小时', '48小时', '72小时']

    function handleclick() {
      isShow.value = true
    }

    function init() {
      store.dispatch('common/Fetch', {
        api: 'talkInfo',
        data: {
          id: route.query.id
        }
      }).then((res: any) => {
        detail.value = res.result
      })
    }

    onMounted(init)
    return {
      userInfo,
      handleclick,
      init,
      detail,
      time
    }
  }
})
</script>
