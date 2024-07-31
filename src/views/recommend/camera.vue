<template>
<div v-if="dataList.length">
  <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in dataList" :key="index">
    <div style=" background: #252632; border-radius: 8px; overflow:hidden; height:300px">
      <v-thumbnail4 :data="item" />
      <div class="ptb15 plr10">
        <div class="mb10 nowrap font16" v-html="item.summary"></div>
        <div class="flex">
          <div class="cl-666" style="flex: 1">@{{item.nickname}}</div>
          <div class="font12 cl-666" style="flex: 1; padding-top: 3px;">{{item.times}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
<div :style="`padding: ${height/2}px`" v-else>
  <v-loding v-if="!loading" />
</div>
</template>

<script setup lang="ts">
import {
  defineComponent
} from '@/utils'

const props: any = defineProps({
  dataList: {
    type: Array,
    default: () => {
      return []
    }
  }
})
</script>
