<template>
  <div class="module-wrap">
    <div class="module-head">话题评论</div>
    <div class="module-content p10">
      <div class="comment-wrap">
        <div class="feedback-content comment-content">
          <div class="feedback-list bg-white"
               v-for="(item, index) in dataList"
               :key="index">
            <img :src="item.photos"
                 width="30"
                 height="30"
                 class="photos">
            <p class="feedback-user">{{item.nickname}}</p>
            <p>{{item.time}}</p>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance,ref, reactive, onMounted } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewe',
  props: {
    data: {
      type: Object,
      default: ()=>{return}
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      summary: "",
    }
  },

setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    debugger
    const { coding3, id:artid, uid } = reactive(props.data)
    let dataList:any = ref([])
    let content: any = ref()
    
        function int(){

          store.dispatch('common/Fetch', {
    
          api: 'ArtList',
          data: {
          coding: "M0003",
          artid
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }
    function sendComment(){
store.dispatch('common/Fetch', {
    
          api: 'Comment',
          data: {
          coding: "M0003",
          artid,
          content: content.value
        }
      }).then( res =>{
        int()
      })
    
    }
    onMounted(int)
    return {
      int,
      sendComment,
      dataList,
      content
  
    }
  }
})
</script>
