<template>
  <div>
    <template v-for="(item, index) in dataList" :key="index">
      <div class="ptb15">
        <!-- 标题 -->
        <div class="multiple-wrap pb15">
          <a :href="item.url" v-html="item.title" class="font16" target="_blank"></a>
        </div>
        <!-- 多张图 -->
        <template v-if="item.img && item.img.length >= 2">
          <div class="thum-wrap flex">
            <div class="thum" v-for="(img, i) in item.img.slice(0, 3)" :key="i">
              <a :href="item.url" target="_blank">
                <img
                  :src="img"
                  class="radius-8"
                  style="width: 215px; height: 120px"
                />
              </a>
            </div>
          </div>
        </template>
        <!-- 单张图 -->
        <template v-else-if="item.img.length > 0">
          <div class="thum-wrap">
            <div class="thum" >
              <a :href="item.url" target="_blank">
                <img
                  :src="item.img[0]"
                  class="radius-8"
                  style="width: 215px; height: 120px"
                />
              </a>
            </div>
            <div class="content">
              <div class="multiple-wrap-3 mb5" style="line-height: 28px" v-html="item.summary"></div>
            </div>
          </div>
        </template>
        <!-- 没有图 -->
        <template v-else>
          <div class="multiple-wrap-2 mb5" style="line-height: 28px" v-html="item.summary"></div>
        </template>
        <!-- <div class="content">
          <p class="footer label font12">
            <span class="mr15">来源：
              <span v-if="item.method=='1'">转</span>
              <span v-else-if="item.method=='2'">原</span>
              <span v-else-if="item.method=='3'">搞</span>
              <span v-else>Ai</span>
            </span>
          </p>
        </div> -->
      </div>
      
    </template>
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
a{
  color: #074daa !important;
  text-decoration: underline;
}
</style>