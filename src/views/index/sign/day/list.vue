<template>
  <div class="card-list">
    <template v-if="dataList.length > 0">
      <div class="col-md-4 pb20 plr10" v-for="(item, index) in dataList" :key="index">
        <div style="border: 0px solid #f0f0f0;">
          <div class="bg-f7f8fa align_center" style="height: 150px;" @click="handleClick(item)">
            <img :src="item.image" onerror="this.src='/images/default.jpg'" style="width: 100%; height: 150px;" /></div>
          <div class="p5 font12 relative">
            <span class="absolute" style="left: 5px; bottom: 32px">
              <span class="font28 bold">{{monthAbbr}} / </span>
              <span class="font14">{{today}}</span>
            </span>
            <div class="mt15 nowrap">{{item.name}}</div>
          </div>
        </div>
      </div>
    </template>
    <v-loding v-else />
  </div>
</template>

<script setup lang="ts">
import Img from '@/components/public/img.vue'
import html2canvas from 'html2canvas'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  defineEmits,
  ref,
  watch,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'

const props: any = defineProps({
  dataList: {
    type: Array,
    default: []
  }
})

const emit: any = defineEmits(['onSelect'])

    const currentSign: any = ref({})
    const currentText: any = ref("")
    const isSelect: any = ref(false)

    function handleClick(param: any) {
      emit('onSelect', param)
    }
</script>

<style lang="less" scoped>
.card-list{
  height: 450px;
  overflow: auto;
}
</style>