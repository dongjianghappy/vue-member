<template>
<v-button v-model:show="isShow">
  去养鱼
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" action="edit" title="鱼苗列表" :style="{width: 650, height: 550}" @submit="submit">
  <template v-slot:content>
  <div class="mb25" style="height: 350px; overflow-y: auto;">
    <div class="ptb10 flex" style="line-height: 20px; align-items: center;" v-for="(item, index) in dataList" :key="index">
      <div style="width: 100px;">
        <div :class="`${item.image}_a`" style="width: 100%; height: 40px;"></div>
      </div>
      <div style="width: 100px;">{{item.name}}</div>
      <div style="flex: 1 1 0%;"></div>
      <div class="flex" style="width: 150px;">
      <div class="p5 align_center" @click="handleClick(-1, item)" style="border: 1px solid var(--default-border); width: 30px; height: 30px;">-</div>
        <div style="border-top: 1px solid var(--default-border); border-bottom: 1px solid var(--default-border); height: 30px;">
          <input class="align_center" type="text" v-model="item.count"  disabled style="width: 50px; height: 28px;">
        </div>
        <div class="p5 align_center" @click="handleClick(1, item)" style="border: 1px solid var(--default-border); width: 30px; height: 30px;">+</div>
      </div>
      <div style="width: 120px; color: rgb(128, 128, 128);"> 消耗 {{item.energys}} g能量 </div>
    </div>
  </div>
  <div class="align_right"> 您将领养 {{total.count}} 条鱼，共消耗 {{total.energy}}g 能量值 </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import { funny } from '@/assets/const';
import {
  defineProps,
  ref,
  useStore,
  watch,
  computed,
  getUid
} from '@/utils'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const store = useStore();
const dialog: any = ref(null)
const isShow = ref(false)
const dataList: any = ref([])

const total: any = computed(() => {
  let count: any = 0
  let energy: any = 0
  dataList.value.forEach((item: any) =>{
    count += item.count
    energy += item.energys
  })

  return {
    count,
    energy
  }
});

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    init()
  }
})

function init() {
  store.dispatch('common/Fetch', {
    api: "seaFish"
  }).then(res => {
    res.result.forEach((item: any) => {
      item.count = 0
      item.energys = 0
    });
    dataList.value = res.result || []
  })
}

function handleClick(type: any ,param: any){
  if(type == -1 && param.count == 0 ){
    return
  }
  param.count += type
  param.energys = param.energy * param.count
}

function submit(){

  const fishList: any = []
  dataList.value.forEach((item: any) => {
    if(item.count){
      fishList.push({
        fish: item.id,
        name: item.name,
        count: item.count,
        energy: item.energys
      })
    }
  })

  store.dispatch('common/Fetch', {
    api: "updateSeaFish",
    data: {
      list: fishList && JSON.stringify(fishList) || ""
    }
  }).then(res => {
    
  })
}

</script>
