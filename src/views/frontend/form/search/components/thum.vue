<template>
  <div class="row clearfix">
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="thumbnail relative radius-8" style="background: var(--card-background); overflow: hidden;">
        <a :href="item.url" target="_blank">
          <div class="thumbnail-img">
            <v-img :src="item.img[0]" />
          </div>
        </a>
        <div class="p10" style="height:40px;">
          <a :href="item.url" class="nowrap" target="_blank" title="item.title" v-html="item.title"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
const props: any = defineProps({
  dataList: {
    type: Array,
    default: []
  }
})
</script>

<style lang="less" scoped>
.thumbnail-img {
  overflow: hidden;
  height: 150px;

  &:hover {
    img {
      transform: scale(1.2);
      transition: all 0.3s;
    }
  }
}
</style>