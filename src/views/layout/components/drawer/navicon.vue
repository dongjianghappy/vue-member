<template>
<span @click="handleChoose" class="pointer">
  <i class="iconfont icon-navicon font24" />
</span>
<v-drawer ref="drawer" v-model:show="isShow" action="add" :isLeft="true" title="" :style="{width: 350}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <Basic />
    <CommonFeatures />
    <CreaterCenter />
    <CommonTool />
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  getCurrentInstance,
  ref,
  useStore,
  watch
} from '@/utils'

import Basic from './components/basic.vue'
import CommonFeatures from './components/commonFeatures.vue'
import CreaterCenter from './components/creatorCenter.vue'
import CommonTool from './components/commonTool.vue'


const props: any = defineProps({
  title: {
    type: String,
    default: "请选择"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  type: {
    type: String,
    default: "checkbox"
  },
  message: {
    type: String,
    default: ""
  },
  api: {
    type: String,
    default: ""
  },
  checked: {
    type: Array,
    default: []
  },
})
const emit: any = defineEmits(['choose'])
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const isShow: any = ref(false)
const drawer: any = ref(null)
const dataList: any = ref([])

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    init()
  }
})

//初始页面
function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 10
  }

  Object.assign(params, param)

  store.dispatch('common/Fetch', {
    api: props.api || "select",
    data: {
      coding: props.data.coding,
      ...props.data.condition,
      ...params
    }
  }).then(res => {
    dataList.value = res.result || {}
  })
}

// 按钮点击
function handleChoose() {
  // 已绑定的禁止点选
  if (props.disabled) {
    proxy.$hlj.message({
      msg: props.message
    })
    return false
  }
  isShow.value = true
}

function getChecked(item: any) {
  let val = false
  if (props.type === 'checkbox') {
    val = props.checked.findIndex((list: any) => list.id === item.id) > -1 ? true : false
  } else {
    val = props.checked === item.id
  }
  return val
}

function handleclick(data: any) {
  let arr = dataList.value.list.filter((item: any) => item.id === data.id)
  if (arr) {
    emit('choose', {
      field: props.data.field,
      data: arr[0]
    })
  }
}
</script>
