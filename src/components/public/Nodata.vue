<template>
<div class="align_center font14" style="height: 120px; line-height: 120px" v-if="data.length === 0">{{trip}}</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-Nodata',
  props: {
    data: {
      type: Array,
      default: []
    },
    trip: {
      type: String,
      default: "暂时没有数据"
    }
  }
})
</script>
