<template>
<v-button v-model:show="isShow">
  订阅消息发布
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="订阅消息发布" :style="{width: 850, height: 500}" @submit="submit">
  <template v-slot:content>
   <v-editor v-model:contentsss="detail.markdown" :data="detail" />
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  marked
} from 'marked';
import {
  defineProps,
  ref,
  useStore,
  watch,
  getUid
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const store = useStore();
const dialog: any = ref(null)
const isShow = ref(false)
const detail: any = ref({})


function submit(){
  const { markdown } = detail.value
  store.dispatch('common/Fetch', {
    api: "sendSubscribeMessage",
    data: {
      content: marked.parse(markdown || "{}"),
      markdown,
    }
  }).then(res => {
    
  })
}

</script>
