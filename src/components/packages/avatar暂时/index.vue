<template>
  <div @click="handleclick">
    <v-popover :getData="getUserInfo"
             content="<img src='http://127.0.0.1//user/110506372/photos/110506372.png' width='30' height='30' class='showuserinfo'>"
             arrow="lr"
             :move="move">
      <div class="user-info-wrap">
        <div class="user-info-photos">
          <div class="blogphotos">
            <img :src="dataList.userInfo.photos"
                 width="30"
                 height="30">
          </div>
          <div class="bloginfo">
            <div class="username">{{dataList.userInfo.nickname}}<span style="color: #f67f00;">LV.{{dataList.userInfo.level}}</span></div>
            <div class="subinfo">
              <a>关注: {{dataList.userInfo.myconcern}}</a>
              <a>粉丝: {{dataList.userInfo.concernmy}}</a>
              <a>原创: {{dataList.userInfo.article}}</a>
              <a>转载: {{dataList.userInfo.forwarding}}</a>
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
    </v-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import {useStore} from 'vuex'
import popover from '../popover/index.vue'

export default defineComponent({
  name: 'v-Avatar',
  components: {
    popover
  },
  props: {
    move: {
      type: Number,
      default: 0
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

    // 点击头像
    function handleclick(){
      console.log("sd");
    }

    // 获取用户信息
    function getUserInfo(){
      store.dispatch('common/Fetch', {
          api: "UserInfo",
          data: {uid: ctx.sourceData.uid}
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

    // 点击关注
    function concern() {
      store.dispatch('common/Fetch', {
          api: "Concern",
          data: {uid: ctx.sourceData.uid}
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
