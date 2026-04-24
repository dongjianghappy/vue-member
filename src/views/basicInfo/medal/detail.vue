<template>
<v-button v-model:show="isShow">
  <img :src="data.image[0]" style="width: 64px; height: 64px;" />
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="" action="edit" :style="{width: 350, height: 450}" :hasfooter="false">
  <template v-slot:content>
    <div class="relative pt35">
    <div class="absolute plr10 font12" style="top: 0; right: 0; border-radius: 50px !important; background: var(--link-hover-background); line-height: 25px; color: #546883">{{statusText}}</div>
    <div class="align_center">
      
    <div class="mb50">
      <img :src="data.image[0]" style="width: 100%; height: 120px;" />
    </div>
    <div class="mb10 font18 bold">{{data.name}}</div>
    <div>{{data.description}}</div>
    <div v-if="data.earned === '1'">{{data.times}}获得（永久有效）</div>
    <div class="mt25" style="height: 50px; line-height: 50px;" v-if="data.earned === '1'">
      <div class="btn-login" @click="handleWear" style="background: var(--link-hover-background); color: #546883" v-if="data.wear == 1">取消佩戴</div>
      <div class="btn-login" @click="handleWear" style="background: var(--link-hover-background); color: #546883" v-else >立即佩戴</div>
    </div>
    </div>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  codings,
  ref,
  watch,
  useStore,
  computed
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  action: {
    type: String,
    default: 'add'
  },
  render: {
    type: Function,
    default: () => {
      return
    }
  },
})

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const coding = codings.user
const isShow = ref(false)
const dialog: any = ref(null)
const detail: any = ref({})

const statusText: any = computed(() => {
console.log("ccc");

  let text = "未获得"
  
  if(props.data.earned == "1"){
    text = "已获得"
    if(props.data.wear){
      text = "佩戴中"
    }
  }

  return text
})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
  }
})

function handleWear() {

  store.dispatch('common/Fetch', {
    api: 'wearMedal',
    data: {
      id: props.data.id,
    }
  }).then((res) => {
    props.data.wear = res.result.status
    proxy.$hlj.message({
      type: 'info',
      msg: res.returnMessage
    })
    props.render()
  })
}
</script>
