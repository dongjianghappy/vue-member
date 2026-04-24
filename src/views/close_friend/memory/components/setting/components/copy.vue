<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-copy" />
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="复制节点" :style="{width: 650, height: 450}" :hasfooter="false">
  <template v-slot:content>
    <div>复制{{data.name}}节点到以下节点中</div>
    <div>
      <ul>
        <li v-for="(item, index) in source" :key="index" @click="handleChoose(item)" :class="{current : item.id === currentData.id}">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div @click="handleCopy">确认复制</div>
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

function handleChoose(param: any){
  currentData.value = param
}

function handleCopy(params: any) {
  const {
    id
  } = props.data

  const param: any = {
    id: id,
    fid: currentData.value.id
  }

  store.dispatch('common/Fetch', {
    api: 'copy',
    data: {
      coding: coding.list,
      ...param
    }
  }).then(res => {
    props.render()
    isShow.value = false
  })
}
</script>
