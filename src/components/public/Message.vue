<template>
<i class="iconfont icon-dot cl-red no-event" style="position: absolute; top: 0px; left: 20px; font-size: 32px !important;" v-if="messgeData.unread"></i>
<video ref="audio" style="display: none">
  <source src="" type="audio/mp3">
</video>
<v-popover content="<i class='iconfont icon-message font18'></i>" arrow="tb" offset="right" :move="-60" keys="popover-message">
  <div style="width: 150px; height: 250px">
    <ul class="font14" style="display: block">
      <li style="height: 32px" v-for="(item, index) in module" :key="index" @click="handleClick(item.value)">{{item.name}}
        <span class="cl-white p5 mt10 right align_center font12" style="background: #f00; width: 25px; height: 15px; line-height: 5px; border-radius: 100px;">{{messgeData.message[item.field] || 0}}</span>
      </li>
    </ul>
  </div>
</v-popover>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  onMounted,
  computed,
  useStore
} from '@/utils'
const props: any = defineProps({
  router: {
    type: Function,
    default: () => {
      return
    }
  }
})
const store = useStore();
const module = computed(() => {
  let message = store.getters['user/config_talk'].message
  let data = message.map((item: any) => {
    let arr = item.value.split("?mod=")
    item.field = arr[1]
    return item
  })

  return data
});

const messgeData: any = ref({})
const time: any = ref(null)
const audio: any = ref(null)

function getMessage() {
  store.dispatch('common/Fetch', {
    api: 'message',
  }).then((res: any) => {
    messgeData.value = res.result

    for (let key in messgeData.value.broadcast) {
      if (messgeData.value.broadcast[key].status == 'true') {
        audio.value.src = messgeData.value.broadcast[key].audio
        audio.value.load()
        audio.value.play()
      }
    }
  })
}

function handleClick(param: any) {
  props.router(param)
}

onMounted(() => {
  getMessage()
  // time.value = setInterval(() => {
  //   getMessage()
  // }, 5000)
})
</script>
