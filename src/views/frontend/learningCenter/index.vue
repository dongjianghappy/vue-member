<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="[{name: 'css3动画', value: 'css3'}, {name: 'Cavans', value: 'canvas'}]" title="学习中心">
      <template v-slot:aside>
      </template>
    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px">
    <Index />
  </div>
</div>
</template>

<script setup lang="ts">
import Index from './components/index.vue'
</script>
