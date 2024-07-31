<template>
<span @click="handleBack">
  <i class="iconfont icon-back" />
  <span class="font14">返回</span>
</span>
</template>

<script setup lang="ts">
import {
  defineComponent,
} from 'vue'
import {
  useRouter
} from 'vue-router';
const router = useRouter()

function handleBack() {
  router.go(-1);
}
</script>
