<template>
    <div class="module-wrap">
        <!-- <div class="module-head">日程信息</div> -->
        <div class="module-head font32" v-if="data.mod === 'day'">{{data.date}}</div>
        <div class="module-content p15" style="height: 650px;">
            <template v-if="data.mod === 'day'">
              <div class="mb15 bold">打卡人次</div>
              <div class="mb35">{{shuliang.today || 0}} 人次</div>
            </template>
            <template v-else-if="data.mod !== 'person'">
              <div class="mb15 bold">打卡人次</div>
              <div class="mb15">累计：{{shuliang.total || 0}} 人次</div>
              <div class="mb35">今天：{{shuliang.today || 0}} 人次</div>
            </template>
            <template v-else>
              <div class="mb15 bold">打卡次数</div>
              <div class="mb15">累计：{{shuliang.total || 0}} 次</div>
              <div class="mb35">今天：{{shuliang.today || 0}} 次</div>
            </template>
            <template v-if="data.mod !=='detail'">
              <div class="mb15 bold">{{data.mod === 'day' ? '日程' : '今天日程'}}</div>
              <div class="mb35">
                  <div class="flex" style="flex-wrap: wrap;">
                      <div class="relative align_center" style="width: 25%" v-for="(item, index ) in detail.schedule" :key="index" @click="handleClick(item)">
                          <i class="iconfont icon-img font32" />
                          <div class="font12">{{item.name}}</div>
                      </div>
                  </div>
              </div>
            </template>
            <template v-if="data.mod !== 'person'">
              <div class="mb15 bold">参与用户</div>
              <div class="mb15">
                <div class="flex" style="flex-wrap: wrap;">
                    <div class="align_center p5" style="width: 25%;" v-for="(item, index ) in detail.user" :key="index">
                        <div class="mb5"><img :src="item.photos" style="width: 35px; height: 35px; border-radius: 50%;"></div>
                    </div>
                </div>
              </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  ref,
  watch,
  onMounted,
  useStore,
  computed,
  getUid,
  useRouter
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter();
const detail: any = ref({})
const shuliang: any = computed(() => {
  return detail.value.rencu || {}
});

function handleClick(param: any){
    router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=detail&id=${param.id}`
  }))
}

function init() {
  const params: any = {}
  if(props.data.date){
    params.date = props.data.date
  }
  if(props.data.mod === 'person'){
    params.isMy = 'true'
  }
  if(props.data.id){
    params.schedule_id = props.data.id
  }
  store.dispatch('common/Fetch', {
    api: "scheduleStatistics",
    data: {
      ...params
    }
  }).then(res => {
    detail.value = res.result || []
  })
}
onMounted(init)
</script>
