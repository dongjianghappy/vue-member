<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-write" />
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="设置状态" width="520px" height="450px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <div class="layer-form-wrap mt25 p0">
    <div class="input-box">
      <input type="text"
             v-model="content"
             :placeholder="`回复${data.nickname}:`"
             ref="Input">
      <div class="expression">
        <v-expression @onEmoji="choose"
                      move="-100" />
      </div>
    </div>
    <div class="operate">
      <button @click="sendComment"
              class="operate-right"
              :class="{disabled: !content}"
              :disabled="!content">发送</button>
    </div>
  </div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  onMounted,
  computed,
  watch
} from '@/utils'

export default defineComponent({
  name: 'HomeViewe',
  props: {
    data: {
      type: Object,
      default: () => {
        return
      }
    },
    showFlag: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const userInfo = computed(() => store.getters['user/userInfo']);
    let Input: any = ref(null)
    let dataList: any = ref([])
    let content: any = ref("")
    let loading: any = ref(false)
    const visible = ref(props.showFlag)

      // 监听弹窗变量
    watch([visible], (next, prev) => {
      context.emit('update:showFlag', false)
    })

    function sendComment() {
      store.dispatch('common/Fetch', {

        api: 'replyMessageBoard',
        data: {
          coding: "U30003",
          fid: props.data.fid || props.data.id,
          reply_id: props.data.fid ? props.data.id : "",
          uid: props.data.from_uid,
          content: content.value
        }
      }).then(res => {
        debugger
        if(!props.data.reply){
          props.data.reply = []
        }
        props.data.reply.push(res.result)
        visible.value=false
      })

    }

    // 选择表情或话题
    function choose(aa: any) {
      content.value = content.value + aa
    }

    onMounted(() => {
      Input.value.focus()

    })
    return {
      Input,
      userInfo,
      sendComment,
      dataList,
      content,
      loading,
      choose,
      visible
    }
  }
})
</script>
