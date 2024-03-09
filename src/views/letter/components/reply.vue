<template>
<v-button v-model:show="isShow">
  <span style="color: #ffc09f">回复</span>
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" title="" :style="{width: 520, height: 120}" :hasfooter="false">
  <template v-slot:content>
    <div class="layer-form-wrap mt25 p0">
      <div class="input-box">
        <input type="text" v-model="content" :placeholder="`回复${data.nickname}:`">
      </div>
      <div class="operate">
        <button @click="submit" class="operate-right" :class="{disabled: !content}" :disabled="!content">发送</button>
      </div>
    </div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
} from '@/utils'

export default defineComponent({
  name: 'v-Reply',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const isShow = ref(false)
    let content: any = ref("")

    function submit() {
      store.dispatch('common/Fetch', {
        api: 'replyMessageBoard',
        data: {
          coding: "U30003",
          fid: props.data.fid || props.data.id,
          reply_id: props.data.fid ? props.data.id : "",
          uid: props.data.from_uid,
          content: content.value
        }
      }).then(res => {
        if (!props.data.reply) {
          props.data.reply = []
        }
        props.data.reply.push(res.result)
        isShow.value = false
      })
    }

    return {
      submit,
      isShow,
      content
    }
  }
})
</script>
