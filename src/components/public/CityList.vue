<template>
<span class="selectgroup">
  <select id="select_province" rel="" v-model="current.province" @change="handleClick(2)">
    <option value="">省份</option>
    <option v-for="(item, index) in cityList.province" :key="index" :value="index">{{item}}</option>
  </select>
  <select id="select_city" rel="" v-model="current.city" @change="handleClick(3)">
    <option value="">地级市</option>
    <option v-for="(item, index) in cityList.city" :key="index" :value="index">{{item}}</option>
  </select>
  <select id="select_area" rel="" v-model="current.area" @change="handleClick">
    <option value="">市、县、区</option>
    <option v-for="(item, index) in cityList.area" :key="index" :value="index">{{item}}</option>
  </select>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive
} from 'vue'
import citys from '@/assets/cityData'

export default defineComponent({
  name: 'v-Search',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          province: "",
          city: "",
          area: ""
        }
      }
    }
  },
  emits: ['choose'],
  setup(props, context) {
    const cityData: any = reactive(citys)
    const cityList: any = reactive({
      province: {},
      city: {},
      area: {}
    })
    const current: any = props.data

    function init(level: any, pid: any) {
      for (var i in cityData) {
        const arr = i.split(',');
        if (arr.length == 1) {
          cityList.province = cityData[i]
        }
        if (arr.length == 2 && arr[1] == pid) {
          cityList.city = cityData[i]
          cityList.area = {}
        }
        if (arr.length == 3 && arr[2] == pid) {
          cityList.area = cityData[i]
        }
      }
    }

    function handleClick(level: any) {
      if (level === 2) {
        init(level, current.province)
        current.city = ""
        current.area = ""
      } else if (level === 3) {
        init(level, current.city)
        current.area = ""
      }

      context.emit('choose', current)
    }
    onMounted(() => {
      init(1, 0)
      init(2, current.province)
      init(3, current.city)
    })
    return {
      cityList,
      current,
      handleClick
    }
  }
})
</script>
