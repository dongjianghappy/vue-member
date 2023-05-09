<template>
  <SelectButton v-if="!isShowBatch" />
    <v-list :data="data" :dataList="dataList" :viewUrl="viewUrl" :editUrl="editUrl" :graphUrl="graphUrl" :isShowBatch="isShowBatch" />
</template>

<script lang="ts">
import {
  defineComponent,
} from '@/utils'
import SelectButton from '../components/SelectButton.vue';
export default defineComponent({
  name: 'HomeView',
  components: {
    SelectButton
  },
  props: {
       channel: {
      type: String,
      default: ""
    },
    isShowBatch:{
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
  },
  setup(props, context) {
    const viewUrl: any = `/${props.channel}?item=view`
    const editUrl: any = `/${props.channel}?item=details&action=edit`
    const graphUrl: any = `/${props.channel}?item=graph`
    return {
      viewUrl,
      editUrl,
      graphUrl
    }
  }
})
</script>
