<template>
<v-popover content="<i class='iconfont icon-face'>表情</i>" arrow="tb" offset="right" :move="move" :type="click" keys="popover-face" @onClick="handleClick">
  <div class="expression-wrap">
    <template v-if="dataList.length">
      <div class="expression-cate">
        <span class="expression-tabs" :class="{current: currentIndex == index}" v-for="(item, index) in dataList" :key="index" @click="handleCate(item, index)">
          <i :class="`iconfont icon-${item.icon}`" :title="item.name" v-if="item.icon" />
          <span :title="item.name" v-else>{{item.name}}</span>
        </span>
      </div>
      <div class="expression-box">
        <template v-for="(item, index) in currentCate" :key="index">
          <div class="col-md-2" v-if="item.isCollect" @click="ChooseEmoji(item.name)">
            <div class="p5">
              <img :src="item.value" :title="item.name" style="width: 100%; height: 100%;" />
            </div>
          </div>
          <div class="expression-gif left" @click="ChooseEmoji(item.name)" v-else>
            <img :src="item.value" :title="item.name" style="width: 24px; height: 24px;" />
          </div>
        </template>
      </div>
    </template>
    <v-loding v-else />
  </div>
</v-popover>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  useStore,
} from '@/utils'

const props: any = defineProps({
  move: {
    type: String,
    default: -10
  }
})
const emit: any = defineEmits(['onEmoji'])
const store = useStore()
const currentCate = ref([])
const dataList = ref([])
const currentIndex: any = ref('0')

function handleClick(param: any) {
  currentIndex.value = "0"
  if (!param) {
    return
  }
  store.dispatch('common/Fetch', {
    api: 'expression'
  }).then(res => {
    dataList.value = res.result
    currentCate.value = res.result.length > 0 ? res.result[0].list : []
  })
}

function handleCate(param: any, index: any) {
  currentCate.value = param.list || []
  currentIndex.value = index
}

function ChooseEmoji(data: any) {
  emit('onEmoji', `[${data}]`)
}
</script>
