<template>
  <v-popover :getData="getUserInfo" :content="photo" arrow="tb" offset="right" :type="click" :keys="`popover-photos${sourceData.account}`" :move="-50">
    <div class="user-info-wrap" v-if="userInfo.account">
      <div class="user-info-head" :style="`background: url(${userInfo.head_background}) no-repeat; background-size: cover`"></div>
      <div class="user-info-photos">
        <div class="blogphotos relative">
          <div class="absolute" style="bottom: 25px">
            <v-photo :data="userInfo" sub="online" />
          </div>
        </div>
        <div class="bloginfo">
          <div class="username">{{userInfo.nickname}}<span style="color: #f67f00;">LV.{{userInfo.level}}</span></div>
          <div class="subinfo">
            <v-concern :userInfo="userInfo" />
          </div>
        </div>
        <div class="blogmenu">
          <span id="sendprivateletter" data-uid="754076" data-nickname="√" data-photos="http://www.yunxi10.com//user/754076/photos/754076.png">私信</span>
          <v-concernbutton :data="userInfo" type="user" />
        </div>
      </div>
      <div class="user-introduction">{{userInfo.introduction || "他还没有更新标签哟"}}</div>
    </div>
    <div style="width: 480px; height: 260px" v-else>
      <v-loding />
    </div>
  </v-popover>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  ref,
  defineProps,
  computed,
  useStore
} from '@/utils'

const props: any = defineProps({
  nickname: {
    type: Boolean,
    default: false
  },
  style: {
    type: Object,
    default: () => {
      return {
        width: 50,
        height: 50,
        radius: "50%"
      }
    }
  },
  sub: {
    type: String,
    default: "v"
  },
  sourceData: {
    type: Object,
    default: () => {
      return
    }
  }
})

const store = useStore();
const userInfo: any = ref({})

// 获取用户信息
function getUserInfo() {
  store.dispatch('common/Fetch', {
    api: "UserInfo",
    data: {
      uid: props.sourceData.uid || props.sourceData.account
    }
  }).then(res => {
    const {
      concern
    } = res.result.userInfo

    res.result.userInfo.concernstatus = '<i class="iconfont icon-friends"></i>'
    if (concern === '0') {
      res.result.userInfo.concernstatus = "关注"
    }
    if (concern === '1') {
      res.result.userInfo.concernstatus = '<i class="iconfont icon-concern"></i>'
    }

    userInfo.value = res.result.userInfo
  })
}

const photo = computed(() => {
  let ph = ""
  if(!props.nickname){

  
  ph = `<div class="relative" :style="style"><img src='${props.sourceData.photos}' width='${props.style.width}' height='${props.style.height}' style="border-radius: ${props.style.radius};">`

  if(props.sub === 'online'){
    ph += `<span class="online ${props.sourceData.online_status ==='1' ? 'isonline' : ''}"></span>`
  }
  else if (props.sourceData.verified === '1') {
    ph += `<span class="verified">v</span>`
  }
  ph += `</div>`
  }else{
    ph = `<span>@${props.sourceData.nickname}</span>`
  }
  return ph
});
</script>
