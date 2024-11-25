<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-copy" />
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="" :style="{width: 350, height: 150}" :hasfooter="false">
  <template v-slot:content>
    <div class="ptb15">
      <div class="h50">您确定要复制一个关于立方体的图层到场景中</div>
      <span class="right" @click="handleCopy(data.current)">确认复制</span>
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
  codings
} from '@/utils'

import ThreeFn from '../../utils/index'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit: any = defineEmits(['operate'])
const store = useStore();
const dialog: any = ref(null)
const coding: any = codings.track
const isShow = ref(false)
const currentData: any = ref({})

function handleChoose(param: any){
  currentData.value = param
}

function handleCopy(item: any) {
  // let news = props.data.current.clone()
  // props.data.scene.children.push(news)
  if(item.copyType === 'roadLine'){
    emit('copy')
  }else{
      ThreeFn[item.userData.type]({
      position: {
        x: 0,
        z: 0
      },
      widthSegments: 3,
      number: 1,
      width: 50,
      height: 50,
      data: {
        content: item.userData
      },
      actionType: 'copy',
      ...props.data,
    })
  }
  isShow.value = false
}
</script>
