<template>
<div class="bg-white">
  <div class="p15" style="background: #eee; ">
    <div style="height: 60px;">
      <div class="mb10 " style="display: flex;">
          <div class="mr10" style="width: 32px"><img :src="data.photos" style="width: 32px; height: 32px; border-radius: 50%;"></div>
          <div class="nowrap" style="flex: 1; line-height: 32px;">
            <a href="http://www.yunxi10.com/ziyuan/9642.html" target="_brank">{{data.title}}</a></div>
      </div>
      <div class="nowrap font12 cl-999">微信公众平台,给个人、企业和组织提供业务服务与用户管理能力的全新服务平台。</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <slot name="extra"></slot>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
})
</script>
