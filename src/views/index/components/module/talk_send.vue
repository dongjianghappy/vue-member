<template>
<div class="module-wrap">
  <div class="module-content send_info p0">
    <div class="sendtitle">
      <v-scrolltext :dataList="announcement" />
    </div>
    <div class="send-input p15">
      <div style=" background: #f0f1f4; boder: 1px solid #f0f1f4; border-radius: 8px; padding: 6px 11px;">
        <textarea placeholder="有什么新鲜事想分享给大家？" v-model="data.summary" class="talkcontent-wrap" style="background: transparent; resize: none;"></textarea>
      </div>
    </div>
    <v-upload ref="upload" @imgList="image" file="talk" :mask="true" v-if="module.upload" />
    <div class="operate">
      <div class="left">
        <span class="infos" @click="upload.handleclick()" v-if="module.upload">
          <i class="iconfont icon-pic"></i>图片
        </span>
        <span class="infos" v-if="module.choose_talk">
          <v-topic @onEmoji="choose" />
        </span>
      </div>
      <div class="right">
        <button @click="sendTalk" class="btn btn-default" :class="{disabled: !data.summary}" :disabled="!data.summary">发送</button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  reactive,
  computed,
  useStore,
  useRoute,
  useRouter
} from '@/utils'

export default defineComponent({
  name: 'HomeViewdd',
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute()
    const router = useRouter()
    const module = computed(() => store.getters['user/config_talk'].talk_send_tool || []);
    const announcement = computed(() => store.getters['common/announcement']);
    const upload: any = ref(null);
    const data: any = reactive({
      summary: "",
      img: ""
    })

    // 监听图片上传
    function image(a: any) {
      data.img = a
    }

    // 选择表情或话题
    function choose(aa: any) {
      data.summary = data.summary + aa
    }

    // 话题发布
    function sendTalk() {
      // proxy.$hlj.loading()
      store.dispatch('common/Fetch', {
        api: 'InsertTalk',
        data: {
          coding: "M0000",
          type: "art",
          img: data.img,
          summary: data.summary
        }
      }).then(res => {
        // proxy.$hlj.close()
        if (res.ifSuccess === 0) {
          proxy.$hlj.message({
            msg: res.returnMessage
          })
          return
        }
        data.summary = ""
        proxy.$message.message({
          msg: "发布成功",
          type: 'success'
        })
        // 发布时需要跳转到话题选项卡
        if (route.query.mod !== "talk") {
          router.push(window.location.pathname)
        }
        store.commit('talk/pushTalkList', res.result)

      })
    }

    return {
      data,
      upload,
      image,
      choose,
      sendTalk,
      announcement,
      module
    }
  }
})
</script>
