<template>
<div @click="handleclick">
  <v-popover :getData="getUserInfo" :content="photo()" arrow="tb" offset="right" :type="click" :keys="`popover-photos${sourceData.account}`" :move="-50">
    <div class="user-info-wrap" v-if="userInfo.account">
      <div class="user-info-head" :style="`background: url(${userInfo.head_background}) no-repeat; background-size: cover`"></div>
      <div class="user-info-photos">
        <div class="blogphotos relative">
          <div class="absolute" style="bottom: 25px">
            <v-photo :data="userInfo" />
          </div>
        </div>
        <div class="bloginfo">
          <div class="username">{{userInfo.nickname}}<span style="color: #f67f00;">LV.{{userInfo.level}}</span></div>
          <div class="subinfo font12">
            <span>关注: {{userInfo.myconcern}}</span>
            <span>粉丝: {{userInfo.concernmy}}</span>
            <span>原创: {{userInfo.article}}</span>
            <span>转载: {{userInfo.forwarding}}</span>
          </div>
        </div>
        <div class="blogmenu">
          <span id="sendprivateletter" data-uid="754076" data-nickname="√" data-photos="http://www.yunxi10.com//user/754076/photos/754076.png">私信</span>
          <v-concernbutton :data="userInfo" type="user" />
          <!-- <span class="concern" @click="concern" v-html="userInfo.concernstatus"></span> -->
        </div>
      </div>
      <div class="user-info-art">
        <div class="col-md-4 p5">
          <div class="radius-4 h90 bg-eee">微博</div>
        </div>
        <div class="col-md-4 p5">
          <div class="radius-4 h90 bg-eee">相册</div>
        </div>
        <div class="col-md-4 p5">
          <div class="radius-4 h90 bg-eee">视频</div>
        </div>
      </div>
      <div class="user-introduction">{{userInfo.introduction || "他还没有更新标签哟"}}</div>
    </div>
    <div style="width: 480px; height: 405px" v-else>
      <v-loding />
    </div>
  </v-popover>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
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
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const userInfo: any = ref({})

    // 点击头像
    function handleclick() {
      console.log("sd");
    }

    // 获取用户信息
    function getUserInfo() {
      store.dispatch('common/Fetch', {
        api: "UserInfo",
        data: {
          uid: props.sourceData.uid
        }
      }).then(res => {
        const {
          concern
        } = res.result.userInfo
        if (concern === '0') {
          res.result.userInfo.concernstatus = "关注"
        } else if (concern === '1') {
          res.result.userInfo.concernstatus = '<i class="iconfont icon-concern"></i>'
        } else {
          res.result.userInfo.concernstatus = '<i class="iconfont icon-friends"></i>'
        }
        userInfo.value = res.result.userInfo
      })
    }

    // 点击关注
    function concern() {
      store.dispatch('common/Fetch', {
        api: "Concern",
        data: {
          uid: props.sourceData.uid
        }
      }).then(res => {
        userInfo.value.concernstatus = res.result.status
      })
    }

    function photo() {
      let ph = `<div class="relative" :style="style"><img src='${props.sourceData.photos}' width='30' height='30' style="border-radius: 50%;">`
      if (props.sourceData.verified === '1') {
        ph += `<span class="verified">v</span>`
      }
      ph += `</div>`
      return ph
    }

    return {
      handleclick,
      getUserInfo,
      userInfo,
      concern,
      photo
    }
  }
})
</script>

<style lang="less" scoped>
//  .el-popover /deep/ .el-popper{
//   background: #191919 !important;
//   padding: 0 !important;
//   .el-popper__arrow::before {
//     background: #191919 !important;
//   }
// }
</style>
