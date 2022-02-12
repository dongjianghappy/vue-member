<template>
  <el-popover :placement="placement"
              :width="480"
              trigger="hover"
              :popper-class="dsdsd"
              @show="getUserInfo">
    <template #reference>
      <span class="block">
        <a :href="`/${sourceData.uid}/home`"><img :src="sourceData.photos"
               width="50"
               height="50" /></a>
      </span>
    </template>
    <div class="user-info-wrap"
         style="background: #191919;">
      <div class="user-info-photos">
        <div class="blogphotos">
          <img :src="userInfo.photos"
               width="30"
               height="30">
        </div>
        <div class="bloginfo">
          <div class="username">{{userInfo.nickname}}<span style="color: #f67f00;">LV.{{userInfo.level}}</span></div>
          <div class="subinfo">
            <a>关注: {{userInfo.myconcern}}</a>
            <a>粉丝: {{userInfo.concernmy}}</a>
            <a>原创: {{userInfo.article}}</a>
            <a>转载: {{userInfo.forwarding}}</a>
          </div>
        </div>
        <div class="blogmenu">
          <a id="sendprivateletter"
             data-uid="754076"
             data-nickname="√"
             data-photos="http://www.yunxi10.com//user/754076/photos/754076.png">私信</a>
          <a class="concern"
             @click="concern"
             v-html="userInfo.concernstatus"></a>
        </div>
      </div>
      <div class="user-info-art">他很懒，没有更新过内容</div>
      <div class="user-introduction">标签：{{userInfo.concernstatus && userInfo.concernstatus.introduction || "他还没有更新标签哟"}}</div>
    </div>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'v-UserInfo',
  props: {
    placement: {
      type: String,
      default: "top-start"
    }, 
    sourceData: {
      type: Object,
      default: () => {return}
    }
  },
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const userInfo: any = ref({})

    // 点击头像
    function handleclick(){
      console.log("sd");
    }

    // 获取用户信息
    function getUserInfo(){
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
        userInfo.value = res.result.userInfo
      })
    }

    // 点击关注
    function concern() {
      store.dispatch('common/Fetch', {
          api: "Concern",
          data: {uid: props.sourceData.uid}
      }).then(res => {
        userInfo.value.concernstatus = res.result.status
      })
    }

    return {
      handleclick,
      getUserInfo,
      userInfo,
      concern,
    }
  }
})
</script>

<style scoped lang="less" >
//  .el-popover /deep/ .el-popper{
//   background: #191919 !important;
//   padding: 0 !important;
//   .el-popper__arrow::before {
//     background: #191919 !important;
//   }
// }
</style>