<template>
<div class="form-wrap-box">
  <div class="li">
    <span class="label">背景音乐</span>
    <input type="text" v-model="userInfo.music_name" placeholder="请输入歌曲名称" class="input-sm input-full" />
    <textarea v-model="userInfo.music_url" placeholder="请输入歌曲url地址" class="w-full"></textarea>
  </div>
  <div class="li">
    <span class="label"></span>
    <span @click="handleSave">保存</span>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  useStore
} from '@/utils'
const props: any = defineProps({
  userInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()

function handleSave() {
  const {
    account,
    music_name,
    music_url,
  } = props.userInfo
  store.dispatch('common/Fetch', {
    api: "editUserInfo",
    data: {
      uid: account,
      music_name,
      music_url
    }
  }).then(res => {
    proxy.$hlj.message({
      type: 'info',
      msg: "保存成功"
    })
  })
}
</script>

