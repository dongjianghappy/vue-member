<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
  </div>
  <div class="m0 right" style="width: 910px">
    <div class="letter">
      <div class="letter-wrap">

        <div class="letter-left">
          <div class="letter-title"><img src="{$sm_user.photos}" class="photos" /><span class="nikename"></span></div>
          <div id="letter-user" class="letter-content">
            <ul></ul>
          </div>
          <div class="letter-form"></div>
        </div>
        <div class="letter-right">
          <div class="letter-title"><span class="close"><i id="close-letter" class="iconfont icon-close"></i></span></div>
          <div id="letter-content" class="letter-content">
            <ul></ul>
          </div>
          <div class="letter-form">
            <input id="lettercontent" value="" placeholder="按回车发送私信" /> <button id="sendletter">提交</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <video id="message-mp3" name="media" class="hide"><source src="../../../source/mp3/notify.mp3" type="audio/mpeg"></video> -->
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
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

    onMounted(init)

    return {
      route,
      isTome,
      dataList,
      loading,
      init,
    }
  }
})
</script>
