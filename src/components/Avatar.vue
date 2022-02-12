<template>
  <div @click="handleclick">
    <Infos :getData="getUserInfo"
           content="<img src='http://127.0.0.1//user/110506372/photos/110506372.png' width='40' height='30' class='showuserinfo'>"
           arrow="lr"
           :move="move">
      <div class="user-info-wrap">
        <div class="user-info-photos">
          <div class="blogphotos">
            <router-link to="/12121221/"><img :src="dataList.userInfo.photos"
                   width="30"
                   height="30"></router-link>
          </div>
          <div class="bloginfo">
            <div class="username"><a href="/754076/home">{{dataList.userInfo.nickname}}</a> <span style="color: #f67f00;">LV.{{dataList.userInfo.level}}</span></div>
            <div class="subinfo">
              <a href="/754076/home?mod=concern&amp;action=myconcern">关注: {{dataList.userInfo.myconcern}}</a>
              <a href="/754076/home?mod=concern&amp;action=concernmy">粉丝: {{dataList.userInfo.concernmy}}</a>
              <a href="/754076/home?mod=article&amp;contype=ori">原创: {{dataList.userInfo.article}}</a>
              <a href="/754076/home?mod=article&amp;contype=for">转载: {{dataList.userInfo.forwarding}}</a>
            </div>
          </div>
          <div class="blogmenu">
            <a id="sendprivateletter"
               data-uid="754076"
               data-nickname="√"
               data-photos="http://www.yunxi10.com//user/754076/photos/754076.png">私信</a>
            <a class="concern"
               @click="concern"
               v-html="dataList.userInfo.concernstatus"></a>
          </div>
        </div>
        <div class="user-info-art">他很懒，没有更新过内容</div>
        <div class="user-introduction">标签：{{dataList.userInfo.concernstatus.introduction || "他还没有更新标签哟"}}</div>
      </div>
    </Infos>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import {useStore} from 'vuex'
import Infos from './intos.vue'

export default defineComponent({
  name: 'v-Avatar',
    components: {
Infos
  },
  photo: {
    type: String,
    default: "@/assets/photo.png"
  },
  props: {
    move: {
      type: String,
      default: "0"
    }, 
    sourceData: {
      type: Object,
      default: () => {return}
    }
  },
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref({})

    function handleclick(){
      console.log("sd");
      
 
    }
    function getUserInfo(){
      debugger
      store.dispatch('common/Fetch', {
          api: "UserInfo",
          data: {uid: props.sourceData.uid}
      }).then(res => {
        const { hasconcern } = res.result.userInfo
        if(hasconcern === 0){
          res.result.userInfo.concernstatus = "关注"
        }else{
          res.result.userInfo.concernstatus = '<i class="iconfont icon-concern"></i>'
        }
        
        dataList.value = res.result
      })
    }
    function concern() {
      store.dispatch('common/Fetch', {
          api: "Concern",
          data: {uid: props.sourceData.uid}
      }).then(res => {
        dataList.value.userInfo.concernstatus = res.result.status
      
      })
    }
    return {
      handleclick,
      getUserInfo,
      dataList,
      concern,
    }
  }
})
</script>
