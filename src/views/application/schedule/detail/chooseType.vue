<template>
    <v-button v-model:show="isShow">
        选择种类
    </v-button>
    <v-dialog v-model:show="isShow" ref="form" title="选择种类" :style="{width: 600, height: 500}" @submit="submit">
        <template v-slot:content>
            <div>
                <div class="album-list col-md-4 pb20 plr10 align_center" v-for="(item, index) in dataList" :class="{current: item.isCurrent}" :key="index" @click="handleClick(item)">
                    <img :src="item" onerror="this.src='/images/noimage.png'" style="width: 100%; height: 200px" />
                    <div>{{item.name}}</div>
                </div>
            </div>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  ref
} from '@/utils'
import QrcodeVue from 'qrcode.vue'
const props: any = defineProps({
  dataList: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const emit: any = defineEmits(['choose'])
const isShow = ref(false)

function handleClick(param: any){
  emit('choose', param)
}

function submit() {  
  isShow.value = false
}
</script>

<style lang="less" scoped>
.album-list {
  img {
    filter: brightness(0.35);
  }
  &.current {
    img {
      filter: brightness(1);
    }
  }
}
</style>
