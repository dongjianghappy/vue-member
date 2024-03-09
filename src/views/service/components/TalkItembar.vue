<template>
<div>
  <div class="bottom-wrap relative">
    <ul>
      <li class="right" style="width: 100px">
        <v-like :data="{fn: fn_talk, ...data}" />
      </li>
      <li class="right" @click="comment" style="width: 100px">
        <i class="iconfont icon-comment"></i> 评论 {{data.comment || 0}}
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
        props.data.collect = res.result.num
        if (res.result.state === 1) {
          props.data.hascollect = 1
        } else {
          props.data.hascollect = 0
        }
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

<style scoped>
.current {
  color: #eb7350;
}
</style>
