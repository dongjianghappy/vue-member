<template>
<div class="container w1100 clearfix">
  <div class="module-wrap">
    <div class="module-content basic-info">
      <div class="font20 bold">您的投诉将在24小时内受理，请尽量提交详细的投诉说明</div>
      <div class="module-content">
        <div>我要投诉的是“ {{detail.nickname}}”发的微博：</div>
        <div class="flex mb25 p25" style="background: #f7f8fa">
          <div class="mr20" style="width: 120px; height: 120px">
            <img :src="detail.image && detail.image[0]" class="radius-8" style=" width: 100%; height: auto; cursor: zoom-in;" />
          </div>
          <div style="flex: 1">
            <div>{{detail.summary}}</div>
            <div class="mt5 font12">{{detail.nickname}}的微博</div>
          </div>
        </div>
        <div class="mb15">请选择你想要投诉的类型</div>
        <div class="mb30">
          <div class="mb25">
            <div class="col-md-2 p15" v-for="(item, index) in time" :key="index">
              <div class="btn btn-default">{{item}}</div>
            </div>
          </div>
        </div>
        <div class="mb25" style="height: 32px; line-height: 32px;
">
          <span class="btn-submit right">提交</span>
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
    const time = ['涉黄信息', '小有害信息', '网络暴力', '人身攻击', '违法信息', '饭圈违规', '不实信息', '违规营销', '侵犯个人权益', '不良价值导向', '涉未成年人', '涉企侵权']

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
