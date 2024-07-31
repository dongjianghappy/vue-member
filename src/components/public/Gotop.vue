<template>
<div class="gotop-2 hide" style="background: var(--module-background); width:40px; height:40px; margin-left:550px; display:block; left: 50%; bottom:90px;">
  <ul>
    <li class="gotop deg180" data-placement="top" @click="handleclick"><i class="iconfont icon-down" style="color: var(--default-font) !important;"></i></li>
  </ul>
</div>
</template>

<script setup lang="ts">
function handleclick() {
  document.documentElement.scrollTop = 0
}
</script>
