<template>
  <div class="form-wrap"
       style="background: rgb(242, 242, 245);">
    <div class="input-box">
      <img :src="userInfo.photos">
      <input type="text"
             v-model="summary"
             placeholder="请输入转载内容">
    </div>
    <div class="operate">
      <div class="operate-left"
           v-if="!loading">

        <span v-for="(item, index) in newestList"
              :key="index">
          @{{item.nickname}}{{item.summary}}
        </span>
      </div>
      <span @click="sendComment"
            class="operate-right">转发</span>
    </div>
    <div class="feedback-content content"
         v-if="!loading">
      <div class="align_center"
           v-if="dataList.length">还有他们也转发了</div>
      <div class="feedback-list"
           v-for="(item, index) in dataList"
           :key="index">
        <img :src="item.photos"
             class="photos">
        <p class="feedback-user">{{item.nickname}}</p>
        <p>{{item.time}}</p>
        <p>{{item.summary}}</p>
      </div>
    </div>
    <div class="load7 h60"
         v-else>
      <div class="loader">Loading...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance,ref, reactive, onMounted, computed } from 'vue'
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

setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const { coding3, id, uid } = reactive(props.data)
    const userInfo = computed(() => store.getters['common/userInfo']);
    const newestList = ref([])
    const dataList:any = ref([])
    let summary: any = ref()
    let loading: any = ref(false)
        function int(){
          loading.value = true
          store.dispatch('common/Fetch', {
    
          api: 'GetForwarding',
          data: {
          uid: "110506372",
          id
        }
      }).then(res => {
        if(res.result.length > 3){
          newestList.value = res.result.slice(0, 3)
          dataList.value = res.result.slice(3, res.result.length)
        }else{
          newestList.value = res.result
        }
        loading.value = false
      })
    }
    function sendComment(){
      store.dispatch('common/Fetch', {
  
        api: 'Forwarding',
        data: {
        coding: "coding3",
        id,
        uid,
        summary: summary.value
        }
      }).then( res =>{
        int()
      })
    
    }
    onMounted(int)
    return {
      int,
      userInfo,
      sendComment,
      newestList,
      dataList,
      summary,
      loading
    }
  }
})
</script>
