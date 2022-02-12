<template>
<div class="module-content" style="margin:0; padding:25px 50px;">
  <div class="font14" style="width:100%;">
    <div class="goto-write" v-if="!isShow">
      留言板需要你的足迹哦，<span id="goto-write" class="pointer" style="color: #666;" @click="write(true)">开始留言</span>
    </div>
    <div class="send_info sendform" style=" background:#f9f9f9; margin:0; padding:15px;" v-else>
      <div class="send-input bb0">
        <textarea id="talkcontent" v-model="content" class="talkcontent-wrap"></textarea>

      </div>
      <div class="operate" style="padding: 15px 0">
        <div class="left">
          <v-expression @onEmoji="choose" />
        </div>
        <div class="right">
          <button id="feedbackbtn" class="btn btn-sm" @click="send">发表</button>
          <button id="cancel-write" class="btn btn-sm" @click="write(false)">取消</button>
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
  ref,
  getUid
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewdd',
  components: {

  },
  props: {
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const upload: any = ref(null);
    let content = ref("");
    let dataList: any = ref([])
    let expressionStatus = ref(false)
    let topicStatus = ref(false)
    const isShow = ref(false)

    function handleclick(q: any) {
      if (q === 'expression') {
        expressionStatus.value = !expressionStatus.value
      } else if (q === 'upload') {
        upload.value.handleclick()
      } else {
        topicStatus.value = !topicStatus.value
      }

    }

    function write(param: any) {
      isShow.value = param
    }

    function send() {
      debugger
      store.dispatch('common/Fetch', {

        api: 'writeMessageBoard',
        data: {
          coding: "U30002",
          uid: getUid(),
          content: content.value
        }
      }).then(res => {
        content.value = ""
        props.render()
      })
    }

    // 选择表情或话题
    function choose(aa: any) {
      content.value = content.value + aa
    }

    function aaaaa(aa: any) {
      content.value = content.value + aa
    }
    return {
      send,
      dataList,
      content,
      handleclick,
      upload,
      expressionStatus,
      topicStatus,
      aaaaa,
      write,
      isShow,
      choose
    }
  }
})
</script>
