<template>
<div class="send_info ptb15 pl30 pr25">

  <div class="send-input">
    <div class="send-input-box relative">
      <textarea ref="Input" placeholder="来一发弹幕吧" v-model="detail.content" @focus="handleFocus($event)" @keyup="handleKeyup" class="talkcontent-wrap" style="background: transparent; resize: none;"></textarea>
    </div>
  </div>
  <div class="operate plr0 pt5">
    <div class="operate-left">
      <span class="infos p0 font14">
        <v-expression @onEmoji="choose" v-if="module.choose_expression" />
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
export default defineComponent({
  name: 'HomeViewe',
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
    let Input: any = ref(null)
    const refaite: any = ref(null)
    const sssss: any = ref(false)
    let dataList: any = ref([])
    const detail: any = reactive({
      content: ""
    })

    function sendComment() {
      const param: any = {
        coding: props.data.coding3,
        uid: props.data.account || props.data.from_uid,
        method: props.method,
        content: detail.content
      }

      if (props.method === 'reply') {
        param.fid = props.data.fid
        param.reply_id = props.data.id
      } else {
        param.fid = props.data.id
      }

      store.dispatch('common/Fetch', {
        api: 'Barrage',
        data: {
          ...param
        }
      }).then(res => {
        props.render(props.data)
      })

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
    return {
      module,
      detail,
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
