<template>
<span class="font12" v-if="!basic">
  <span class="mr10" @click="handleClickss(userInfo, 'myconcern')"><span>关注</span> {{userInfo.myconcern}}</span>
  <span class="mr10" @click="handleClickss(userInfo, 'concernmy')"><span>粉丝</span> {{userInfo.concernmy}}</span>
  <!-- <span><span>话题</span> {{userInfo.talk}}</span> -->
</span>
<ul v-else>
  <li @click="handleClickss(userInfo, 'concernmy')" class="pointer">
    <span><strong>{{userInfo.concernmy}}</strong><span>粉丝</span></span>
  </li>
  <li @click="handleClickss(userInfo, 'myconcern')" class="pointer">
    <span><strong>{{userInfo.myconcern}}</strong><span>关注</span></span>
  </li>
  <li @click="handleClick('praise')" class="pointer">
    <a><strong>{{userInfo.talk}}</strong><span>获赞</span></a>
  </li>
</ul>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  computed
} from 'vue'
import {
  useStore,
  useRouter,
  getUid
} from '@/utils'
const store = useStore();
const router = useRouter();
const {
  proxy
}: any = getCurrentInstance();

const props: any = defineProps({
  basic: {
    type: Boolean,
    default: false
  },
  userInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

function handleClickss({
  account
}: any, param: any) {
  store.dispatch('common/Fetch', {
    api: "verificationGrade",
    data: {
      uid: account,
      type: 'concernList',
      query: param
    }
  }).then(res => {
    if (res.ifSuccess) {
      window.location.href = proxy.const.setUrl({
        uid: account,
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
  if (param === 'praise') {
    router.push(proxy.const.setUrl({
      uid: getUid(),
      query: `?mod=${param}`
    }))
  } else {
    router.push(proxy.const.setUrl({
      uid: getUid(),
      query: `/concern?mod=${param}`
    }))
  }
}
</script>
