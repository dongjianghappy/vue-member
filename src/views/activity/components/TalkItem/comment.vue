<template>
  <div class="comment-wrap"
       style="background: rgb(242, 242, 245);">
    <div class="comment-submit relative">
      <img src=" http://localhost//user/110506372/photos/110506372.png "
           width="30"
           height="30">
      <input class="commoncon"
             type="text"
             v-model="content">
    </div>
    <div class="comment-operate relative">
      <a class="infos face"
         data-insertbox=".commoncon"
         data-placement="top"
         data-toggle="toolface"
         data-left="300">
        <i class="iconfont icon-face"></i>
      </a>
      <input type="checkbox"
             class="toauthor"
             value="y">同时给原创者留言
      <a data-uid="110506372"
         @click="sendComment"
         class="commentbtn right"
         style="background: #ffc09f; color: #fff; border: 1px solid #fbbd9e; width:40px; height:25px; line-height:25px; text-align: center;">评论</a>
    </div>
    <div class="feedback-content comment-content">
      <div class="feedback-list"
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
