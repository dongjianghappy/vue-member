<template>
<div class="module-content" style="margin:0; padding:25px 50px;">
  <div class="font14" style="width:100%;">
    <div class="goto-write mb5">
      主人寄语: <span class="cl-999">{{userInfo.message || '无'}}</span>
      <span class="ml10 pointer" style="color: #f67f00; " @click="()=>isShow = true" v-if="!isShow">
        
        开始留言</span>
    </div>
    <div class="send_info sendform" style=" background:#f9f9f9; margin:0; border-radius: 8px; padding:15px;" v-if="isShow">
      <div class="send-input bb0">
        <textarea v-model="content" placeholder="请输入留言内容" class="talkcontent-wrap" style="resize: none;"></textarea>
      </div>
      <div class="operate plr0">
        <div class="right">
          <button class="btn btn-default mr10" @click="send">发表</button>
          <button class="btn btn-default" @click="()=>isShow = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  computed,
  getUid,
} from '@/utils'

export default defineComponent({
  name: 'HomeViewdd',
  props: {
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    let content = ref("");
    const isShow = ref(false)
    const userInfo: any = computed(() => store.getters['user/userInfo']);

    function send() {
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


    return {
      userInfo,
      send,
      content,
      isShow
    }
  }
})
</script>
