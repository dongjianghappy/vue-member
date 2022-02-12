<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="menu" title="留言板" />
  </div>
  <div class="m0 right" style="width: 910px">

    <div class="module-wrap mb15">
      <div class="module-head p20">
        留言板
        <!--留言板需要你的足迹哦http://125772116.qzone.qq.com-->
      </div>
      <Send :render="init" />
      <div class="module-content" style="padding: 25px 50px !important;">

        <div class="feedback-content-wrap" style="display:block;">
          <div class="feedback-content feedback-lists">
            <div style=" border-bottom:1px solid #eee; height:50px; line-height:50px;">
              <span>留言（{{dataList.length}}）</span>
            </div>
            <div class="feedback-list" style="background: none;" v-for="(item, index) in dataList" :key="index">
              <img :src="item.photos" width="45" height="45">
              <p class="feedback-user">{{item.nickname}} {{item.times}}</p>
              <p>{{item.content}}</p>
              <div class="reply_info" v-for="(data, i) in item.reply" :key="i">
                <img :src="data.photos" width="25" height="25">
                <p>{{data.nickname}} {{data.times}}</p>
                <p>{{data.content}}</p>
              </div>

              <p class="reply_default">我也说一句...</p>
              <div class="reply_wrap">
                <div class="form">
                  <textarea field="content"></textarea>
                  <div>
                    <i></i>
                    <input type="hidden" field="fid" value="{$sm_body[l].id}">
                    <button class="confirm" data-coding="U30003">确定</button>
                    <button class="cancel">取消</button>
                    <em class="countmsg">0/35</em>
                  </div>
                </div>
              </div>

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
  getCurrentInstance,
  computed,
  ref,
  onMounted,
  getUid
} from '@/utils'
import {
  useStore
} from 'vuex'
import Send from './components/send.vue'
import Index from './components/index.vue'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  components: {
    Send
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const component = computed(() => route.query.mod);
    const dataList = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "userMessageBoard",
        data: {
          uid: getUid()
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      component,
      dataList,
      init
    }
  }
})
</script>
