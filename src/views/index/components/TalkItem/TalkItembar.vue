<template>
<div>
  <div class="bottom-wrap relative">
    <ul>
      <li @click="onClick({ api: 'Collect', data: { coding: data.coding5, artid: data.id }})">
        <i class="iconfont icon-star" :class="{current: data.hascollect === 1}"></i>
        <span :class="{current: data.hascollect === 1}"> {{data.collect || '收藏'}}</span>
      </li>
      <li v-if="data.model != 'member_talk'">
        <a class="block" :href="`http://www.dongblog.com/${data.model}/${data.id}.html`" target="_brank">
          <i class="iconfont icon-view"></i>
          <span>{{data.visit != '0' ? data.visit : '查看'}}</span>
        </a>
      </li>
      <li @click="forwarding" v-else>
        <i class="iconfont icon-fenxiang"></i>
        <span>{{data.forwarding != '0' ? data.forwarding : '转发'}}</span>
      </li>
      <li @click="comment">
        <i class="iconfont icon-comment"></i> {{data.comment != '0' ? data.comment : '评论'}}
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
import Comment from './comment/index.vue'

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
    },
    showComment: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const fn_talk: any = computed(() => store.getters['user/config_talk'].fn_talk);
    let showCommit: any = ref(false)
    let isShow: any = ref(props.showComment || false)

    function onClick(param: any) {
      store.dispatch('common/Fetch', param).then(res => {
        if(res.ifSuccess === 2){
          return
        }
        props.data.collect = res.result.num
        if (res.result.state === 1) {
          props.data.hascollect = 1
        }else{
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
      if(props.showComment){
        isShow.value = true
        return
      }
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
