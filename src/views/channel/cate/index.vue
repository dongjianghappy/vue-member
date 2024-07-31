<template>
<div class="module-wrap mb15 operation_wrap">
  <div class="module-head p20">
    专辑
  </div>
  <div class="module-content p10">
    <div class="row clearfix" v-if="dataList.length">
      {{item}}
      <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in dataList" :key="index">
        <div class="thumbnail p10 relative" style="background: #fff;; overflow: hidden;">
          <img :src="item.cover || item.image[0]" style="border-radius: 8px; width: 100%; height: 150px;">
          <div class="
                 caption
                 relative" style="padding:10px 0; height:40px;">
            <span class="inputline updata nowrap" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display:block !important">{{item.name}}【{{item.num}}张】</span>

          </div>
        </div>
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
    default: () => {
      return []
    }
  },
  item: {
    type: String,
    default: ""
  }
})
</script>
