<template>
  <div @click="handleclick">
    <v-popover :getData="getUserInfo"
             :content="`<img src='${sourceData.photos}' width='30' height='30' class='showuserinfo'>`"
             arrow="tb"
             offset="right"
             :type="click"
             :keys="`popover-photos${sourceData.account}`"
             :move="move">
      <div class="user-info-wrap"
           style="background: #191919;">
        <div class="user-info-photos">
          <div class="blogphotos">
            <v-photo :data="userInfo"
                      :style="{    width: '50px',
    height: '50px',
    borderRadius: '50%'}" />
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
    </v-popover>
  </div>
</template>



<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import {useStore} from 'vuex'
import popover from '../packages/popover/index.vue'
export default defineComponent({
  name: 'v-UserInfo',
  components: {
popover
  },  
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
