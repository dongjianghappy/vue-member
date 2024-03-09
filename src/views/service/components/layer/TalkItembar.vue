<template>
  <div>
    <div class="bottom-wrap relative">

      <ul>
        <li style="width: 33.333333333%;" @click="onClick({ api: 'Collect', data: { coding: data.coding5, artid: data.id }})">
          <i class="iconfont icon-star"></i><span>收藏 {{data.collect}}</span>
        </li>
        <li style="width: 33.333333333%;">
          <i class="iconfont icon-comment"></i>评论 {{data.comment}}
        </li>
        <li style="width: 33.333333333%;">
          <v-like :data="data" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'TalkItemBarView',
  components: {
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
     

      function praise(){
      store.dispatch('common/Fetch', {
        api: 'praise'
      })
    }
    return {
      onClick,
      isShow,
      forwarding,
      praise,
    }
  }
})
</script>
