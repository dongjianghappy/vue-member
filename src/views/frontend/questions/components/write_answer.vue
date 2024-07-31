<template>
<div class="module-content send_info detail" style="box-shadow: none; padding: 0px 10px">
  <div class="sendtitle">我来回答 TA 的问题</div>
  <div class="send-input p0">
    <div>
      <div style="
          background: var(--input-background);
          border-radius: 8px;
          padding: 6px 11px;
        ">
        <textarea v-model="content" placeholder="在这里填写你的答案哦" class="talkcontent-wrap nobd w-full" style="background: transparent; resize: none"></textarea>
      </div>
    </div>
  </div>
  <div class="operate p0 pt15">
    <div class="left"></div>
    <div class="right">
      <button class="btn" style="background: var(--input-background);
    border-radius: 30px;
    color: var(--button-font);
    width: auto;
    height: 32px;
    text-align: center;" @click="handleClick">
        提交答案
      </button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  useStore,
  codings,
} from '@/utils'
import asks from './asks.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  render: {
    type: Function,
    default: () => {
      return
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const coding = codings.questions
const content: any = ref("")

function handleClick() {

  store.dispatch('common/Fetch', {
    api: "Insert",
    data: {
      coding: coding.answer,
      artid: props.data.id,
      content: content.value
    }
  }).then(res => {
    proxy.$message.message({
      msg: "提交成功"
    })
    props.render()
  })
}
</script>
