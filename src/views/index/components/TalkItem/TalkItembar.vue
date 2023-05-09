<template>
<div>
  <div class="bottom-wrap relative">
    <ul>
      <li @click="onClick({ api: 'Collect', data: { coding: data.coding5, artid: data.id }})">
        <i class="iconfont icon-star"></i><span>收藏 {{data.collect}}</span>
      </li>
      <li @click="forwarding">
        <i class="iconfont icon-fenxiang"></i>分享 {{data.forwarding}}
      </li>
      <li @click="comment">
        <i class="iconfont icon-comment"></i>评论 {{data.comment}}
      </li>
      <li>
        <v-like :data="{fn: fn_talk, ...data}" />
      </li>
    </ul>
  </div>
  <Comment :data="{fn: fn_talk, ...data}" v-if="showCommit" />
  <Forwarding :data="{fn: fn_talk, ...data}" v-if="isShow" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  useStore
} from '@/utils'
import Forwarding from './forwarding/index.vue'
import Comment from './comment/comment.vue'

export default defineComponent({
  name: 'TalkItemBarView',
  components: {
    Forwarding,
    Comment
  },
  props: {
    data: {
      type: Object,
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
    const fn_talk: any = computed(() => store.getters['user/config_talk'].fn_talk);
    let showCommit: any = ref(false)
    let isShow: any = ref(false)

    function onClick(param: any) {
      store.dispatch('common/Fetch', param).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }

    function forwarding() {
      showCommit.value = false
      isShow.value = !isShow.value
    }

    function comment() {
      showCommit.value = !showCommit.value
      isShow.value = false
    }

    return {
      onClick,
      isShow,
      showCommit,
      forwarding,
      comment,
      fn_talk
    }
  }
})
</script>
