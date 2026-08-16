<template>
<div class="p10 font16 item-thum-wrap" style="overflow: hidden;" v-for="(item, index) in dataList" :key="index">
  <div class="col-md-10 pr15">
      <div class="pt5 font12">
          <span class="mr15 cl-ccc inline">
          <v-photos :sourceData="item" /></span>
          <span class="mr15 cl-ccc">{{item.nickname}}</span>
      </div>
  </div>
  <div class="col-md-2">
      {{item.times}}
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  useStore,
  ref,
  onMounted,
  computed,
  useRoute,
  useRouter,
  codings,
  getUid
} from '@/utils'
const props: any = defineProps({
  data: {
    type: Array,
    default: () => {
      return {}
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();

const store = useStore()
const route = useRoute()
const router = useRouter();
const coding: any = codings.user.schedule.content
const loading = ref(false)
const dataList: any = ref([])

function handleClick(){
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=custom&item=month&id=${route.query.id}`
  }))
}

function init() {
  store.dispatch('common/Fetch', {
    api: "scheduleRecord",
    data: {
      coding,
      id: route.query.id,
      system: props.data.system
    }
  }).then(res => {
    dataList.value = res.result || []
  })
}

onMounted(() => {
    init()
})
</script>

<style lang="less" scoped>
.photos {
  width: 80px;

  img {
    width: 50px;
    height: 50px;
  }
}

.item-thum-wrap {
  .num {
    font-size: 18px;
    font-weight: bold;
    color: #999;
  }

  &:nth-child(1) {
    .num {
      color: #f44f4f;
    }
  }

  &:nth-child(2) {
    .num {
      color: #ff761e;
    }
  }

  &:nth-child(3) {
    .num {
      color: #f1a905;
    }
  }
}
</style>
