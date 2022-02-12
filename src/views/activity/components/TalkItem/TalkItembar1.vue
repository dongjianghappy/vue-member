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

    <comment v-if="showCommit" />
    <Forwarding :isShow="isShow"
                :data="data"
                @cancel="cancel" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue'
import {useStore} from 'vuex'
import Forwarding from './forwarding.vue'
import comment from './comment.vue'

export default defineComponent({
  name: 'TalkItemBarView',
  components: {
   Forwarding,
   comment
  },
  props: {
    data: {
      type: Object,
      default: ()=>{return}
    }
  },
  data() {
    return {
      isShow: false
    };
  },  
  methods:{
        forwarding(){
          
         this.isShow=true
    }
    ,cancel(){
      this.isShow=false
    },
            
  },
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore();
    const { coding5, id:artid } = reactive(props.data)
    let showCommit:any = ref(false)

    
    function onClick(param: any){
      // const options={
      //   type:'12',
      //   message:'success',
      // }
      // console.log(66666)
      // proxy.$hlj.message(options)
      store.dispatch('common/Fetch', param)
    }
      function comment(){
            showCommit.value= !showCommit.value
      }

      function praise(){
      store.dispatch('common/Fetch', {
        api: 'praise'
      })
    }
    return {
      onClick,
      showCommit,
      comment,
      praise,
    }
  }
})
</script>
