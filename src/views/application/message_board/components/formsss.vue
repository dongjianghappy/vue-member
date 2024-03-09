<template>
<div>
  <div class="input-box">
    <div class="img-box">
      <v-photo :data="userInfo" :style="{width: '50px', height: '50px', borderRadius: '50%'}" />
    </div>
    <input type="text" v-model="detail.content" @focus="handleFocus($event)" @keyup="handleKeyup" placeholder="请输入评论信息" ref="Input">
  </div>
  <div style="padding: 10px 25px 0 80px;">
    <v-upload ref="upload" @imgList="image" file="talk" uploadtype="comment" :mask="true" maxLength="1" />
  </div>
  <div class="operate">
    <div class="operate-left">
      <span class="infos p0">
        <v-expression @onEmoji="choose" />
      </span>
      <span class="infos" @click="upload.handleclick()">
        <i class="iconfont icon-pic" />图片
      </span>
      <span class="infos" v-if="data.model === 'member_talk' || api">
        <v-aite ref="refaite" :data="{flag: sssss, content: detail.content}" @onEmoji="choose" @onClick="(e)=>sssss = e" :keys="keys" />
      </span>
    </div>
    <button @click="sendComment" class="operate-right" :class="{disabled: !detail.content}" :disabled="!detail.content">评论</button>
  </div>
</div>
</template>

<script lang="ts">
import { codings } from '@/utils'
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
export default defineComponent({
  name: 'HomeViewe',
  components: {
    
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
    api: {
      type: String,
      default: ""
    },
    method: {
      type: String,
      default: ""
    },
    keys: {
      type: String,
      default: ""
    },
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const coding = codings.talk.message_board
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
        coding: coding.reply,
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
        api: "replyMessageBoard",
        data: {
          ...param
        }
      }).then(res => {
        if (res.ifSuccess === 0) {
          proxy.$hlj.message({
            msg: res.returnMessage
          })
          return
        }
        props.render()
      })

    }

    // 监听图片上传
    function image(a: any) {
      detail.img = a
    }

    // 选择表情或话题
    function choose(param: any) {
      let arr2 = detail.content.split('@')

      if(param[0] === '@' || (param.indexOf("@") > -1 && arr2[arr2.length-1].indexOf(" ") === -1)){
       if(detail.content[detail.content.length-1] === '@'){
        let str = detail.content.substring(0, detail.content.length-1)
        detail.content = str + param
       }
       else if(arr2[arr2.length-1].indexOf(" ") === -1){
        let index = detail.content.lastIndexOf('@'+arr2[arr2.length-1])
        let str = detail.content.substr(0, index)
        detail.content = str + param
       }
       else{
        detail.content = detail.content + param
       }
      }else{
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
      Input.value.focus()
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
