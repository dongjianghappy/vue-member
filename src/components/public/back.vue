<template>
  <span class="font16 left"
        @click="handleBack">
    <i class="iconfont icon-back" />
  </span>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'
import {
  useRouter
} from 'vue-router';

export default defineComponent({
  name: 'v-Back',
  setup(props, context) {
    const router = useRouter()

    function handleBack() {
      router.go(-1);
    }
    return {
      handleBack
    }
  }
})
</script>
