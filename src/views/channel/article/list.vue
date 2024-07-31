<template>
<SelectButton v-if="!isShowBatch" />
<v-list :data="data" :dataList="dataList" :viewUrl="viewUrl" :editUrl="editUrl" :graphUrl="graphUrl" :isShowBatch="isShowBatch" />
</template>

<script setup lang="ts">
import {
  defineProps,
} from '@/utils'
import SelectButton from '../components/SelectButton.vue';

const props: any = defineProps({
  channel: {
    type: String,
    default: ""
  },
  isShowBatch: {
    type: Boolean,
    default: false
  },
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
  }
})
const viewUrl: any = `/${props.data.channel}?item=view`
const editUrl: any = `/${props.data.channel}?item=details&action=edit`
const graphUrl: any = `/${props.data.channel}?item=graph`
</script>
