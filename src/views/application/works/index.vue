<template>
  <div class="bg-white container w1100 shadow">
    <Send />

    <div class="module-wrap mb15">

      <div class="module-content"
           style="padding: 25px 50px !important;">

        <div class="feedback-content-wrap"
             style="display:block;">
          <div class="feedback-content feedback-lists">
            <div style=" border-bottom:1px solid #eee; height:50px; line-height:50px;">
              <span>留言（122）</span>
            </div>
            <div class="feedback-list"
                 style="background: none;">
              <img src="http://www.yunxi10.com//user/110506372/photos/110506372.png"
                   width="45"
                   height="45">
              <p class="feedback-user">东江哥 11月24日 23:06</p>
              <p>擦</p>
            </div>
            <div class="feedback-list"
                 style="background: none;">
              <img src="http://www.yunxi10.com//user/1101946957/photos/1101946957.png"
                   width="45"
                   height="45">
              <p class="feedback-user">秋林 10月29日 16:14</p>
              <p>aasdadetre</p>
              <div class="reply_info">
                <img src="http://www.yunxi10.com//user/110506372/photos/110506372.png"
                     width="25"
                     height="25">
                <p>东江哥 10月29日 16:21</p>
                <p>你好啊</p>
              </div>
              <div class="reply_info">
                <img src="http://www.yunxi10.com//user/110506372/photos/110506372.png"
                     width="25"
                     height="25">
                <p>东江哥 11月24日 23:06</p>
                <p>程序正常做</p>
              </div>
            </div>
            <div class="feedback-list"
                 style="background: none;">
              <img src="http://www.yunxi10.com//user/1101946957/photos/1101946957.png"
                   width="45"
                   height="45">
              <p class="feedback-user">秋林 10月29日 16:14</p>
              <p>dsaddsadsad</p>
              <div class="reply_info">
                <img src="http://www.yunxi10.com//user/110506372/photos/110506372.png"
                     width="25"
                     height="25">
                <p>东江哥 10月29日 16:21</p>
                <p>今晚吃鸡不</p>
              </div>
            </div>
            <div class="feedback-list"
                 style="background: none;">
              <img src="http://www.yunxi10.com//user/1101946957/photos/1101946957.png"
                   width="45"
                   height="45">
              <p class="feedback-user">秋林 10月29日 16:14</p>
              <p>dsad</p>
              <div class="reply_info">
                <img src="http://www.yunxi10.com//user/110506372/photos/110506372.png"
                     width="25"
                     height="25">
                <p>东江哥 10月29日 16:21</p>
                <p>的撒大大</p>
              </div>
            </div>
            <div class="feedback-list"
                 style="background: none;">
              <img src=""
                   width="45"
                   height="45">
              <p class="feedback-user"> </p>
              <p></p>
            </div>
            <div class="feedback-list"
                 style="background: none;">
              <img src=""
                   width="45"
                   height="45">
              <p class="feedback-user"> </p>
              <p></p>
            </div>
            <div class="feedback-list"
                 style="background: none;">
              <img src=""
                   width="45"
                   height="45">
              <p class="feedback-user"> </p>
              <p></p>
            </div>
            <div class="feedback-list"
                 style="background: none;">
              <img src=""
                   width="45"
                   height="45">
              <p class="feedback-user"> </p>
              <p></p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, ref } from 'vue'
import {useStore} from 'vuex'
import Send from './components/send.vue'
import Index from './components/index.vue'
import {useRouter, useRoute} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  components: {
    Send
  },
    setup(props,context) {
  const {ctx}:any = getCurrentInstance();
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  const component = computed(() => route.query.mod);

  return {
    component,
  }
}
})
</script>
