<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-edit" />日程管理
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" action="edit" title="日程管理" :style="{width: 750, height: 500}" :hasfooter="false">
  <template v-slot:content>
    <div class="mb25">
      <span class="p10">总共有 {{dataList.length}} 个日程</span>
      <span class="p10 right"><Detail :data="{coding: data.coding}" :render="init" /></span>
    </div>
    <div class="p15" style="overflow-y: scroll; height: 350px">
    <div class="flex" v-for="(item, index) in dataList" :key="index" style="border-bottom: 1px solid var(--default-border);">
      <div class="p10" style="width: 150px">{{item.name}}
        <span class="mr10"><Detail action="edit" :data="{id: item.id, coding: data.coding}" :render="init" v-if="item.complete === '1'" /></span>
      </div>
      <div class="p10" style="flex: 1">{{item.description}}</div>
      <div class="p10" style="width: 80px">
        <span>
          <v-switch :data="{ item, field: 'complete', coding: data.coding }" @toggle="getValue" className="right" :auth="true" />
          <!-- {{item.complete === '1' ? '已完成' : '进行中'}} -->
          </span>
      </div>
    </div>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  getUid
} from '@/utils'
import Detail from './detail1.vue'
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
const dataList: any = ref([])

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    init()
  }
})

function init() {
  store.dispatch('common/Fetch', {
    api: "schedule",
    data: {
      coding: props.coding,
      system: '0'
    }
  }).then(res => {
    dataList.value = res.result || []
  })
}

</script>
