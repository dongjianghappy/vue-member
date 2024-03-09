<template>
<div class="relative" style="display: inline-block;">
  <img :src="data.photos" onerror="this.src='http://www.yunxi10.com/source/public/images/head_normal_100.png'" @click="handleClick(data.from_uid || data.account || data.uid)">
    <v-concernbutton :data="data" type="icon" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useRouter,
  getUid,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Photo1',
  props: {
    data: {
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
    const store = useStore()

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

    function concern(param: any) {
      store.dispatch('common/Fetch', {
        api: "Concern",
        data: {
          uid: param.uid,
          display: 'icon'
        }
      }).then(res => {
        param.concern = res.result.status
      })
    }

    return {
      handleClick,
      concern
    }
  }
})
</script>
