<template>
<Audio :dataList="dataList" :data="data"  />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref
} from '@/utils'
import Audio from '../../../../sound/components/audio.vue'
export default defineComponent({
  name: 'v-Image',
  components: {
    Audio
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, context) {
    const showFlag = ref(false)
    const currentData = ref()
    const currentImg = ref()

    function showImg(data: any, img: any) {
      currentData.value = data
      currentImg.value = img
      showFlag.value = !showFlag.value
    }

    return {
      showFlag,
      currentData,
      currentImg,
      showImg
    }
  }
})
</script>
