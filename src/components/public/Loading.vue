<template>
<div class="con-list pt15" v-if="!loading && dataList.length === 0">
  <div class="load7 h60">
    <div class="loader">Loading...</div>
  </div>
</div>
<v-nodata :data="dataList" v-else />
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-Nodata',
  props: {
    dataList: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
})
</script>
