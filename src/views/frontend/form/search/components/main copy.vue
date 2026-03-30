<template>
<div class="module-wrap">
  <div class="module-content">
    <div class="mb15">博客网已为你找到以下结果</div>
    <div>
      <template v-for="(item, index) in dataList.list" :key="index">
        <div
          class="thum-wrap ptb15"
          style="display: block;"
          v-if="item.img && item.img.length >= 2">
          <div class="multiple-wrap mb10">
            <a :href="item.url" v-html="item.title" class="font16" target="_blank"></a>
          </div>
          <div style="display: flex">
            <div class="thum" v-for="(img, i) in item.img" :key="i">
              <a><img
                  src="/images/default.jpg"
                  class="radius-8"
                  style="width: 215px; height: 120px"
                />
              </a>
            </div>
            <div
              class="thum align_center"
              style="background-color: #f2f2f2; width: 215px; height: 120px; line-height: 120px"
            >
              点击更多
            </div>
          </div>
          <div class="content">
            <p class="footer">
              <span class="mr15">
                <a>{{item.parent}}</a>
              </span>
              <span class="mr15"> {{item.source}} </span>
              <span>
                {{item.times}}
              </span>
            </p>
          </div>
        </div>
        <div class="thum-wrap ptb15" v-else>
          <div class="thum" v-if="item.img.length > 0">
            <a>
              <img
                src="/images/default.jpg "
                class="radius-8"
                style="width: 215px; height: 120px"
              />
            </a>
          </div>
          <div class="content">
            <div class="multiple-wrap mb10">
              111
              <a :href="item.url" v-html="item.title" class="font16" target="_blank"></a>
            </div>
            <p class="multiple-wrap-2 mb5" style="line-height: 32px" v-html="item.summary"></p>
            <p class="footer label font12">
              <span class="mr15">来源：
                <span v-if="item.method=='1'">转</span>
                <span v-else-if="item.method=='2'">原</span>
                <span v-else-if="item.method=='3'">搞</span>
                <span v-else>Ai</span>
              </span>
            </p>
          </div>
        </div>

      </template>
    </div>
    <div class="mt25 align_left" v-if="dataList.total > 10">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :simple="true" :render="render" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  dataList: {
    type: Object,
    default: () => {
      return {}
    }
  },
  render: {
    type: Function,
    default: () => {
      return
    }
  },
})
</script>

<style lang="less" scoped>
.search-button{
  display: flex;
  li{
    background: #eee;
    margin-right: 10px;
    border-radius: 4px;
    width: 80px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
}
a{
  color: #074daa !important;
}
</style>