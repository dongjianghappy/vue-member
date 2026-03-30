<template>
<div class="module-wrap m0 relative" style="background: #161823">
  <div class="module-content p25" style=" height: 130px;">
    <a href="http://localhost:8081/home" target="_blank" rel="nofollow">
    <div class="mb25 font24" style="font-family: cursive !important; color: #68738a">博客 - 记录生活，分享点滴</div>
    <div class="align_right" style="color: #68738a;">
      点击前往博客大厅<i class="iconfont icon-arrow m0" style="margin: 0 !important; color:  #68738a;"></i>
    </div>
    </a>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits
} from 'vue'

const emit: any = defineEmits(['update:show', 'onClick'])

function handleClick() {
  emit('onClick')
}
</script>
<style>

</style>
