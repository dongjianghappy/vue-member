<template>
<div class="module-wrap">
  <div class="module-content user-photos p0">
    <div class="user-head">
      <v-avatar :data="userInfo" />
    </div>
    <div class="user-info">
      <div class="name-box">
        {{userInfo.nickname}} <span style="color: #f67f00;">LV.{{userInfo.level}}</span></div>
      <div class="name-atten">
        <v-concern />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter
} from '@/utils'

export default defineComponent({
  name: 'UserInfoView',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const router = useRouter();
    function handel() {
      router.push(`/u/${props.userInfo.account}/home`)
    }
    return {
      handel
    }
  },
})
</script>
