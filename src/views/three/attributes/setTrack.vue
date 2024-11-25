<template>
<v-button v-model:show="isShow">
  <span class="cl-666">选择路线</span>
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="选择路线" :action="action" :style="{width: 550, height: 350}" width="520px" height="450px" :data="data" @submit="submit">
  <template v-slot:content>
    <div style="height: 225px; overflow: auto">
      <div v-for="(item, index) in dataList" :key="index" class="ptb5 flex" @click="handleClick(item)">
        <div class="nowrap" style="flex: 1"><i class="iconfont icon-position" /> {{item.name}}</div>
        <div class="w80">
          <i class="iconfont icon-dagou" :class="{'cl-green': currentLocation == item.address}" />
        </div>
      </div>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  watch,
  useStore,
  codings,
  computed,
  onMounted
} from '@/utils'


const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit: any = defineEmits(['Track'])
const store = useStore();
const coding = codings.three.road_line
const dataList: any = ref([])
const isShow = ref(false)

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    init()
  }
})

function init(){
  store.dispatch('common/Fetch', {
    data: {
      coding,
    }
  }).then((res) => {
    dataList.value = res.result || []
  })
}

function handleClick(param: any) {
  let win: any = window
  emit('Track', param)
}

function submit(){
  isShow.value = false
}

</script>