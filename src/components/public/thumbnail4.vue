<template>
<v-button v-model:show="isShow" class="relative">
  <div class="thumbnail">
    <v-img :src="data.cover || data.image[0].replace(/thumb/g, 'view')" @click="showImg(data)" />
  </div>
</v-button>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Thumbnail',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props, context) {
    const isShow: any = ref(false)

    function showImg(param: any) {
      VueEvent.emit("screen", {
        data: param
      });
    }

    return {
      isShow,
      showImg
    }
  }
})
</script>

<style lang="less" scoped>
.thumbnail {
  overflow: hidden;
  height: 220px;

  &:hover {
    img {
      transform: scale(1.2);
      transition: all 0.3s;
    }
  }
}
</style>
