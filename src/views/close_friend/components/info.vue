<template>
<div class="module-content basic-info" style="background: var(--card-background);">
          <div class="flex">
            <div style="flex: 1">
              <div class="mb15">
                <div class="font12">
                  <!-- <span class="mr15">性别：{{data.sex === '1' ? '男' : '女'}}</span> -->
                  <span class="mr25">生日: {{data.year}} - {{data.month}} - {{data.day}}</span>

                </div>
                <div class="mt10 font12">
                  <span class="mr15">职业: {{data.unit}}</span>
                  <span class="mr15">{{data.industry}}</span>
                </div>
                                <div class="mt10 font12">
                  <span class="mr15">微信: {{data.weixin}} </span>
                  <span class="mr15">电话: {{data.phone}}</span>
                  <span class="mr15">qq: {{data.qq}}</span>
                </div>
                <div class="mt10 font12">
                  <span class="mr15">家乡: {{address.province}} {{address.city}} </span>
                  
                </div>
                                               
                <div class="mt10 font12">
                  <span class="mr15">住址: {{data.address}}</span>
                </div>

                                <div class="mt10 font12">
                  <span class="mr15">时间：{{data.know_time}}</span>
                </div>
                                <div class="mt10 font12">
                  <span class="mr15">说明：{{data.introduction}}</span>
                </div>
                                <div class="mt10 font12">
                  <span class="mr15">地点：{{data.know_address}}</span>
                </div>
              </div>
            </div>
            <div class="plr15" style="width:150px">
              <div class="align_center">
                <img class="radius-4" :src="data.photo" onerror="this.src='/images/head_normal_100.png'"  style="width: 100%;" />
                <div class="mt5">
                  {{data.name}}
                </div>
                <div class="m25"><Detail action="edit" :data="{id: data.id, coding: data.coding}" :render="render" /></div>
              </div>
            </div>
          </div>
        </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  useStore,
  watch,
  computed,
  reactive
} from '@/utils'
import citys from '@/assets/cityData'
import Detail from './detail.vue'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  }
})
const cityData: any = reactive(citys)
const address = computed(() => addressInit());

function addressInit() {
  let province = ""
  let city = ""
  let area = ""
  for (var i in cityData) {
    const arr = i.split(',');
    if (arr.length == 1) {
      province = cityData[i][props.data.province]
    }
    if (arr.length == 2 && arr[1] == props.data.province) {
      city = cityData[i][props.data.city]
    }
    if (arr.length == 3 && arr[2] == props.data.city) {
      area = cityData[i][props.data.area]
    }
  }

  return {
    province,
    city,
    area
  }
}
</script>
