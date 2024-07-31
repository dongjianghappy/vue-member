<template>
<v-button v-model:show="isShow" :disabled="false" v-if="userInfo.account !== data.from_uid">
  <i class="iconfont icon-comment"></i>
</v-button>
<span v-else><i class="iconfont icon-comment cl-ccc"></i></span>
<v-dialog v-model:show="isShow" ref="form" className="font16" :title="`回复@${data.nickname}`" :style="{width: 650, height: 350}" width="520px" height="450px" :hasfooter="false">
  <template v-slot:content>
    <Form :data="data" api="commentReply" :method="method" :keys="`reply_${data.id}`" />
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import Form from "./formsss.vue"

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
  },
})
const store = useStore();
const isShow = ref(false)
const userInfo: any = computed(() => store.getters['user/userInfo']);
</script>
