<template>
<div class="relative inline">
  <img :src="data.photos" style="position: inherit;" @click="handleClick(data)">
  <span class="online" :class="{isonline: data.online_status ==='1'}" v-if="sub === 'online'"></span>
  <v-concernbutton :data="data" type="icon" v-else-if="sub === 'concern'" />
  <span class="verified" v-else-if="v && data.verified === '1'">
    v
  </span>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  useRouter,
  getUid
} from '@/utils'

const props = defineProps({
  sub: {
    type: String,
    default: "v"
  },
  data: {
    type: Object,
    default: () => {
      return
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const router = useRouter();

function handleClick(data: any) {
  const uid = data.from_uid || data.account || data.uid
  if (typeof (uid) === 'undefined') {
    return
  }
  if (getUid() !== uid) {
    if (props.data.status === '2') {
      router.push(`/b/${uid}`)
    } else {
      const path = window.location.pathname.split("/")
      window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}`;
    }

  } else {
    router.push(`${proxy.const.u}${uid}`)
  }
}
</script>
