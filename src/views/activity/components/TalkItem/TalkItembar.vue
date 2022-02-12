<template>
  <div>
    <div class="bottom-wrap">

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
        <li @click="onClick({ api: 'Praise', data: { coding: data.coding4, artid: data.id }})">
          <i class="iconfont icon-like"></i>点赞 {{data.praise}}
        </li>
      </ul>
    </div>

    <Comment :data="data"
             v-if="showCommit" />
    <Forwarding v-if="isShow"
                :data="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue'
import {useStore} from 'vuex'
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
      default: ()=>{return}
    }
  },
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore();
    const { coding5, id:artid } = reactive(props.data)
    let showCommit:any = ref(false)
    let isShow: any = ref(false)

    
    function onClick(param: any){
      store.dispatch('common/Fetch', param).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }
        function forwarding(){
        showCommit.value= false
         isShow.value= !isShow.value

    }
      function comment(){
            showCommit.value= !showCommit.value
            isShow.value= false
      }

      function praise(){
      store.dispatch('common/Fetch', {
        api: 'praise'
      })
    }
    return {
      onClick,
      isShow,
      showCommit,
      forwarding,
      comment,
      praise,
    }
  }
})
</script>
