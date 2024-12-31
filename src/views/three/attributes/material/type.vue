<template>
  <li>
    <span class="label">种类</span>
    <v-select :enums="materialType" v-model:value="data.materialType" :defaultValue="data.materialType = data.materialType ? data.materialType : 'MeshBasicMaterial'" />
  </li>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'

import {
  materialType
} from '@/assets/threeConst'

const props: any = defineProps({
  data: {
    type: Object,
    return: () => {
      return {}
    }
  }
})

</script>