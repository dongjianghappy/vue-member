<template>
<div :class="{relative: v}" style="display: inline-block;">
  <img :src="data.photos" onerror="this.src='http://www.yunxi10.com/source/public/images/head_normal_100.png'" @click="handleClick(data.from_uid || data.account || data.uid)">
  <span class="verified" v-if="v && data.verified === '1'">
    v
  </span>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useRouter,
  getUid
} from '@/utils'

export default defineComponent({
  name: 'v-Photo',
  props: {
    data: {
      type: Object,
      default: () => {
        return
      }
    },
    v: {
      type: Boolean,
      default: true
    },
    style: {
      type: Object,
      default: () => {
        return
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const router = useRouter();

    function handleClick(uid: any) {
      if (uid === undefined) {
        return
      }
      if (getUid() !== uid) {
        if (props.data.status === '2') {
          router.push(`/b/${uid}`)
        } else {
          const path = window.location.pathname.split("/")
          window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}/home`;
        }

      } else {
        router.push(`${proxy.const.u}${uid}/home`)
      }
    }

    return {
      handleClick
    }
  }
})
</script>
