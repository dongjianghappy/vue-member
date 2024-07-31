<template>
<div class="module-wrap mb15 operation_wrap">
  <div class="module-content" v-if="dataList.list">
    <div class="row clearfix">
      <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in dataList.list" :key="index">
        <div class="thumbnail p10 relative" style="background: var(--card-background); overflow: hidden;">
          <v-thumbnail :data="item" :type="type" :hasComment="true" />
          <div class="
                 caption
                 relative" style="padding:10px 0; height:40px;">
            <span class="inputline updata nowrap" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display:block !important">{{item.title}}【{{item.image.length}}张】</span>
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
  type: {
    type: String,
    default: "image"
  },
  dataList: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
