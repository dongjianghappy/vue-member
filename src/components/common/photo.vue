<template>
<img :src="data.photos" @click="handleClick(data.from_uid || data.account || data.uid)" :style="style">
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
      defualt: () => {
        return
      }
    },
    style: {
      type: Object,
      defualt: () => {
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
      if (getUid() !== uid) {
        const path = window.location.pathname.split("/")
        window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}/home`;
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
