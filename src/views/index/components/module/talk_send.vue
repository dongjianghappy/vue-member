<template>
  <div class="module-wrap mb10">
    <div class="module-content send_info p0"
         style="overflow: inherit;">
      <slot>
        <div class="sendtitle mb5">
          <v-scrolltext :dataList="announcement" />
        </div>
      </slot>
      <div class="send-input ptb0 p15">
        <div class="send-input-box relative">
          <textarea placeholder="记录与分享生活中的美好点滴。"
                    v-model="data.summary"
                    @focus="handleFocus($event)"
                    @keyup="handleKeyup"
                    class="talkcontent-wrap"
                    style="background: transparent; resize: none;"></textarea>
        </div>
      </div>
      <v-upload ref="upload"
                @imgList="image"
                file="talk"
                :mask="true"
                v-if="module.upload" />
      <div class="p15 font12"
           v-if="data.img">
        <v-radio label="九宫格"
                 name="display"
                 value="0"
                 v-model:checked="data.display" />
        <v-radio label="图集"
                 name="display"
                 value="1"
                 v-model:checked="data.display" />
        <v-radio label="图片电影"
                 name="display"
                 value="2"
                 v-model:checked="data.display" />
      </div>
      <div class="pt10 pl10"
           v-if="data.video.song_name">
        <i class="iconfont icon-music" />{{data.video.title}}
        <i class="iconfont icon-close font12"
           @click="()=>data.video = {}" />
      </div>
      <div class="operate">
        <div class="operate-left">
          <span class="infos p0">
            <v-expression @onEmoji="choose"
                          v-if="module.choose_expression" />
          </span>
          <span class="infos"
                @click="upload.handleclick()"
                v-if="module.upload">
            <i class="iconfont icon-pic" />图片
          </span>
          <span class="infos"
                @click="handleClick('upload')"
                v-if="module.video">
            <i class="iconfont icon-video" />视频
          </span>
          <span class="infos"
                v-if="module.choose_activity">
            <v-topic ref="reftopic"
                     :data="{topicFlag: topicFlag, content: data.summary}"
                     @onEmoji="choose"
                     @onClick="(e)=>topicFlag = e" />
          </span>
          <span class="infos"
                v-if="module.choose_user">
            <v-aite ref="refaite"
                    :data="{flag: sssss, content: data.summary}"
                    @onEmoji="choose"
                    @onClick="(e)=>sssss = e" />
          </span>
          <span class="infos"
                v-if="module.choose_music">
            <v-audiolist @onEmoji="(e)=>data.video = e" />
          </span>
        </div>
        <div class="operate-right"
             style=" width: 200px;">
          <!-- <v-location /> -->
          <v-visible v-model:visible="visible" />
          <button @click="sendTalk"
                  class="btn"
                  :class="{disabled: !data.summary}"
                  :disabled="!data.summary">发送</button>
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
  props: {
    summary: {
      type: String,
      default: ""
    }
  },
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
    const visible: any = ref('public')
    const aite: any = ref(false)
    const style: any = ref({})
    const reftopic: any = ref(null)
    const topicFlag: any = ref(false)
    const refaite: any = ref(null)
    const sssss: any = ref(false)
    const data: any = reactive({
      summary: props.summary,
      img: "",
      video: {},
      display: ''
    })

    // 监听图片上传
    function image(a: any) {
      data.img = a
    }

    // 选择表情或话题
    function choose(param: any) {
      let word_arr = data.summary.split('#')
      let arr2 = data.summary.split('@')

      if (param[0] === '@' || (param.indexOf("@") > -1 && arr2[arr2.length - 1].indexOf(" ") === -1)) {
        if (data.summary[data.summary.length - 1] === '@') {
          let str = data.summary.substring(0, data.summary.length - 1)
          data.summary = str + param
        } else if (arr2[arr2.length - 1].indexOf(" ") === -1) {
          let index = data.summary.lastIndexOf('@' + arr2[arr2.length - 1])
          let str = data.summary.substr(0, index)
          data.summary = str + param
        } else {
          data.summary = data.summary + param
        }
      } else if (param[0] === '#' || (param.indexOf("#") > -1 && word_arr[word_arr.length - 1].indexOf(" ") === -1)) {
        debugger
        if (data.summary[data.summary.length - 1] === '#') {
          let str = data.summary.substring(0, data.summary.length - 1)
          data.summary = str + param
        } else if (word_arr[word_arr.length - 1].indexOf(" ") === -1) {
          let index = data.summary.lastIndexOf('#' + word_arr[word_arr.length - 1])
          let str = data.summary.substr(0, index)
          data.summary = str + param
        } else {
          data.summary = data.summary + param
        }
      } else {
        data.summary = data.summary + param
      }
    }

    // 话题发布
    function sendTalk() {
      // proxy.$hlj.loading()
      store.dispatch('common/Fetch', {
        api: 'InsertTalk',
        data: {
          coding: "M0000",
          visible: visible.value,
          type: data.img ? "img" : "art",
          img: data.img,
          summary: data.summary,
          display: data.display,
          background_music: data.video.id
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
        data.img = ""
        data.video = {}
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

    function handleFocus(param: any) {
      if (param.data === "@" && !sssss.value) {
        sssss.value = true
        refaite.value.click(sssss.value)
      }
    }

    function handleKeyup(param: any) {
      if (param.key === "@" && !sssss.value) {
        sssss.value = true
        refaite.value.click(sssss.value)
      } else if (param.key === "#" && !topicFlag.value) {
        topicFlag.value = true
        reftopic.value.click(topicFlag.value)
      }
    }

    function handleClick(param: any = "") {
      router.push(`/${param}`)
    }

    return {
      data,
      visible,
      upload,
      image,
      choose,
      sendTalk,
      announcement,
      module,
      handleFocus,
      handleKeyup,
      aite,
      reftopic,
      topicFlag,
      refaite,
      style,
      sssss,
      handleClick
    }
  }
})
</script>
