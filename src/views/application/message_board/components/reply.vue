<template>
<v-button v-model:show="isShow" :disabled="false">
  <span class="cl-666">回复</span>
</v-button>
<v-dialog v-model:show="isShow" ref="form" className="font16" :title="`回复`" :style="{width: 650, height: 350}" width="520px" height="450px" :hasfooter="false">
  <template v-slot:content>
    <ReplyForm :data="data" api="commentReply" :method="method" :keys="`reply_${data.id}`" />
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  ref,
} from 'vue'
import ReplyForm from "./replyFrom.vue"

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  method: {
    type: String,
    default: ""
  }
})
const isShow = ref(false)
</script>
