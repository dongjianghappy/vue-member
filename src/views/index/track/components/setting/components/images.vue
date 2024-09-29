<template>
<div class="module-wrap absolute" style="background: rgb(34, 34, 34); top: 0; left: 0; right: 0; bottom: 0">
<div class="module-wrap nobg">
  <div class="module-head">图库
    <span @click="handleReturn" class="right">
      <i class="iconfont icon-close" />
    </span>
  </div>
  <div class="module-content" style="height:480px; overflow-y: auto;" >
    <div class="p15" v-if="isChoose">
      <div class="col-md-4" :class="className" v-for="(item, i) in data.img" :key="i">
        <div class="m5 relative">
          <img :src="item" height="140" style="border-radius: 8px; width: 100%" @click="handleChoose(item)" />
          <i class="iconfont icon-checkbox m0 cl-red" style="right: 0px; top: 0px; padding: 2px; z-index: 1;" v-if="currentData.img && currentData.img.indexOf(item) > -1"></i>
        </div>
      </div>
    </div>
    <v-upload ref="upload" :data="{id: data.id}" :dataList="data.img || []" uploadtype="trackmap" @imgList="image" :style="'width: 135px'" v-else />
  </div>
  <div>
  <span @click="submit">上传</span>
  </div>
</div>
</div>
</template>

<script setup lang="ts">
import { codings } from '@/utils'
import {
  defineProps,
  defineEmits,
  ref,
  onMounted
} from 'vue'
import { useStore } from 'vuex'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  currentData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  isChoose: {
    type: Boolean, 
    default: true,
  },
  ccccc: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const store = useStore()
const coding = codings.track
const img = ref("")
const upload: any = ref(null);
function handleChoose(param: any) {
  if (props.currentData.img.indexOf(param) > -1) {
    let index = props.currentData.img.indexOf(param)
    props.currentData.img.splice(index, 1)
  } else {
    props.currentData.img.push(param)
  }
}
function handleReturn() {
  props.ccccc.imageKu = false
}

// 设置图片
function image(a: any) {
  img.value = a
}


function submit(params: any) {
  const {
    id
  } = props.data

  const param: any = {
    id,
    img: img.value,
  }

  store.dispatch('common/Fetch', {
    api: 'Update',
    data: {
      coding: coding.art,
      ...param
    }
  }).then(res => {
    
  })
}
</script>
