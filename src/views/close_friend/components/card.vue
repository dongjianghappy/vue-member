<template>
<ul class="clearfix">
  <li class="mb10" v-for="(item, index) in data" :key="index">
    <div class="grid-wrap">
      <div class="grid-left">
        <v-photos :sourceData="item" />
      </div>
      <div class="grid-body">
        <p>
          <span style="font-weight:bold;">{{item.nickname}}</span>
          <i class="iconfont icon-male" v-if="item.sex === '1'"></i>
          <i class="iconfont icon-female" v-else></i>
          <span v-if="mod === 'myconcern' && loginuser.account === userInfo.account">
            <Remark :data="{uid: item.account}" /><span style="color: #FFC107;" v-if="item.image">(图)</span></span>
          <span class="ml5"><Blacklist :data="{uid: item.account, blacklist: item.blacklist}" /></span>
          <span class="right">
            <span class="concern" @click="concern(item)" v-if="item.account !== loginuser.account">{{item.concern_status}}</span>
            <span class="ml15" v-if="mod === 'myconcern' && loginuser.account === userInfo.account">
              <v-popover content="<i class='iconfont icon-down font18'></i>" arrow="tb" offset="right" :move="-60" :keys="`popover-${index}`">
                <div class="p15" style="width: 150px; height: 250px">
                  <ul class="font14" style="display: block">
                    <li style="height: 32px" v-for="(data, i) in group" :key="i" @click="handleClick({ friend_uid: item.account, grouping: data.id })">{{data.name}}({{data.num}})</li>
                  </ul>
                </div>
              </v-popover>
            </span>
          </span>
        </p>
        <p class="font12">
          <v-concern :userInfo="item" />
        </p>
        <p class="font12 cl-666">{{item.signature || 'Ta还没有签名'}}</p>
      </div>

    </div>
  </li>
</ul>
</template>

<script setup lang="ts">
import Remark from './remark.vue'
import Blacklist from './blacklist.vue'
import {
  defineProps,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  getUid
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    defualt: () => {
      return
    }
  },
  mod: {
    type: String,
    default: "concernmy"
  },
  group: {
    type: Object,
    default: () => {
      return {}
    }
  },
  render: {
    type: Function,
    default: () => {
      return
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter();
const loginuser = computed(() => store.getters['user/loginuser']);
const userInfo = computed(() => store.getters['user/userInfo']);

// 点击关注
function concern(item: any) {
  store.dispatch('common/Fetch', {
    api: "Concern",
    data: {
      uid: item.account
    }
  }).then(res => {
    if (res.returnMessage === "你已取消关注") {
      item.concern_status = "关注Ta"
    } else {
      item.concern_status = "互相关注"
    }
  })
}

function handleClickss(uid: any, param: any) {
  store.dispatch('common/Fetch', {
    api: "verificationGrade",
    data: {
      uid: uid,
      type: 'concernList',
      query: param
    }
  }).then(res => {
    if (res.ifSuccess) {
      window.location.href = proxy.const.setUrl({
        uid: uid,
        query: res.result
      })
    } else {
      proxy.$hlj.message({
        type: 'info',
        msg: res.returnMessage
      })
    }

  })
}

function handleClick(param: any) {
  store.dispatch('common/Fetch', {
    api: "UpdateGrouping",
    data: {
      ...param
    }
  }).then(res => {
    props.render()
  })

}

function handleGoto(uid: any) {
  if (getUid() !== uid) {
    const path = window.location.pathname.split("/")
    window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}/home`;
  } else {
    router.push(`${proxy.const.u}${uid}/home`)
  }
}
</script>
