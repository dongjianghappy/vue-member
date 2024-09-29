<template>
<v-button v-model:show="isShow">
  关联轨道示意图
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="轨道示意图" :style="{width: 650, height: 450}" :hasfooter="false">
  <template v-slot:content>
    <ul>
      <li v-for="(item, index) in dataList" :key="index" class="flex">
        <div class="nowrap" style="flex: 1"><i class="iconfont icon-position" /> {{item.name}}</div>
        <div class="w80" @click="handleBind(item)">
          <span v-if="item.type === ''">可关联</span>
          <span :class="item.artid === data.id ? 'cl-red' : 'cl-333'" v-else>已关联</span>
          <!-- <i class="iconfont icon-dagou" :class="{'cl-green': item.id === currentData.id}" /> -->
        </div>
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore,
  codings
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  source: {
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
const store = useStore();
const dialog: any = ref(null)
const coding: any = codings.track
const isShow = ref(false)
const currentData: any = ref({})
const dataList: any = ref([])

// 监听弹窗变量
watch([isShow], (newValues, prevValues) => {
  if (isShow.value) {
    init()
  }
})

function init() {
  store.dispatch('common/Fetch', {
    api: 'trackMapList',
    data: {
      coding: coding.art,
      type: 'talk'
    }
  }).then(res => {
    dataList.value = res.result
  })
}

function handleBind(param: any) {
  store.dispatch('common/Fetch', {
    api: 'bindTrackMap',
    data: {
      coding: coding.art,
      type: 'talk',
      id: param.id,
      artid: props.data.id
    }
  }).then(res => {
    init()
  })  
}
</script>
