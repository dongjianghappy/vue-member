<template>
<div class="send_info ptb15 pl30 pr25">

  <div class="send-input">
    <div class="send-input-box relative">
      <textarea ref="Input" placeholder="说些什么..." v-model="detail.content" @focus="handleFocus($event)" @keyup="handleKeyup" class="talkcontent-wrap" style="background: transparent; resize: none;"></textarea>
    </div>
  </div>
  <div style="overflow: auto;">
    <v-upload ref="upload" @imgList="image" file="talk" :mask="true" v-if="module.upload" />
  </div>
  <div class="operate plr0 pt5">
    <div class="operate-left">
      <span class="infos p0 font14">
        <v-expression @onEmoji="choose" v-if="module.choose_expression" />
      </span>
      <span class="infos font14" @click="upload.handleclick()" v-if="module.upload">
        <i class="iconfont icon-pic font14" />图片
      </span>

    </div>
    <div class="operate-right" style=" width: 65px;">
      <button @click="sendComment" class="btn font12" :class="{disabled: !detail.content}" :disabled="!detail.content">发送</button>
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
  onMounted,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import Images from '../components/image.vue'
export default defineComponent({
  name: 'HomeViewe',
  components: {
    Images
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return
      }
    },
    method: {
      type: String,
      default: ""
    },
    keys: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const userInfo = computed(() => store.getters['user/userInfo']);
    const module = computed(() => store.getters['user/config_talk'].talk_send_tool || []);
    const upload: any = ref(null);
    let Input: any = ref(null)
    const refaite: any = ref(null)
    const sssss: any = ref(false)
    let dataList: any = ref([])
    const detail: any = reactive({
      content: "",
      img: ""
    })

    function sendComment() {
      const param: any = {
        coding: props.data.coding3,
        uid: props.data.account || props.data.from_uid,
        method: props.method,
        img: detail.img,
        content: detail.content
      }

      if (props.method === 'reply') {
        param.fid = props.data.fid
        param.reply_id = props.data.id
      } else {
        param.fid = props.data.id
      }

      store.dispatch('common/Fetch', {
        api: 'Comment',
        data: {
          ...param
        }
      }).then(res => {
        props.render(props.data)
      })

    }

    // 监听图片上传
    function image(a: any) {
      detail.img = a
    }

    // 选择表情或话题
    function choose(param: any) {
      let arr2 = detail.content.split('@')

      if (param[0] === '@' || (param.indexOf("@") > -1 && arr2[arr2.length - 1].indexOf(" ") === -1)) {
        if (detail.content[detail.content.length - 1] === '@') {
          let str = detail.content.substring(0, detail.content.length - 1)
          detail.content = str + param
        } else if (arr2[arr2.length - 1].indexOf(" ") === -1) {
          let index = detail.content.lastIndexOf('@' + arr2[arr2.length - 1])
          let str = detail.content.substr(0, index)
          detail.content = str + param
        } else {
          detail.content = detail.content + param
        }
      } else {
        detail.content = detail.content + param
      }

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
      }
    }

    onMounted(() => {
      // Input.value.focus()
    })
    return {
      module,
      upload,
      detail,
      image,
      Input,
      userInfo,
      sendComment,
      dataList,
      choose,
      handleFocus,
      handleKeyup,
      refaite
    }
  }
})
</script>
