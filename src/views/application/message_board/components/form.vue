<template>
<div class="module-wrap mb10">
  <div class="module-content send_info p0" style="overflow: inherit;">
    <div class="send-input ptb0">
      <div class="send-input-box relative">
        <textarea :placeholder="placeholder" v-model="detail.summary" class="talkcontent-wrap" style="background: transparent; resize: none;"></textarea>
      </div>
    </div>
    <div style="overflow: auto;">
      <v-upload ref="upload" @imgList="image" file="talk" :mask="true" v-if="module.upload" maxLength="1" />
    </div>
    <div class="operate plr0">
      <div class="operate-left">
        <span class="infos p0">
          <v-expression @onEmoji="choose" v-if="module.choose_expression" />
        </span>
        <span class="infos" @click="upload.handleclick()" v-if="module.upload">
          <i class="iconfont icon-pic" />图片
        </span>
      </div>
      <div class="operate-right" style=" width: 200px;">
        <button @click="sendTalk" class="btn" :class="{disabled: !isCommit}" :disabled="!isCommit">发送</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  reactive,
  computed,
  useStore
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  placeholder: {
    type: String,
    default: "有什么新鲜事想分享给大家？"
  },
  render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const loginuser: any = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk'].talk_send_tool || []);
const isCommit = computed(() => {
  return detail.summary || detail.img
});
const upload: any = ref(null);
const detail: any = reactive({
  summary: "",
  img: "",
  video: {}
})

// 监听图片上传
function image(a: any) {
  detail.img = a
}

// 选择表情
function choose(param: any) {
  detail.summary = detail.summary + param
}

// 发布留言
function sendTalk() {
  store.dispatch('common/Fetch', {
    api: 'writeMessageBoard',
    data: {
      coding: props.data.coding,
      uid: loginuser.value.account,
      img: detail.img,
      content: detail.summary
    }
  }).then(res => {
    if (res.ifSuccess === 2) {
      return
    }

    if (res.ifSuccess === 0) {
      proxy.$hlj.message({
        msg: res.returnMessage
      })
      return
    }
    detail.summary = ""
    detail.img = ""
    detail.video = {}
    proxy.$message.message({
      msg: "发布成功",
      type: 'success'
    })
    props.render()
  })
}
</script>
