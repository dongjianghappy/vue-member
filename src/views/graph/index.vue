<template>
<v-graph :data="detail" :save="save" @close="handleClose" />
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  useRoute,
  watch
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit: any = defineEmits(['update:show'])
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const route = useRoute();
const detail: any = ref({})
const loading: any = ref(false)

// 监听
watch(route, async (newValues, prevValues) => {
  init()
})

function handleClose() {
  emit('update:show', false)
}

// 初始化数据
function init() {
  const {
    coding,
    detailApi,
    id
  } = props.data

  loading.value = false
  store.dispatch('common/Fetch', {
    api: detailApi || 'getGraph',
    data: {
      coding: coding,
      id: id
    }
  }).then(res => {
    loading.value = true
    detail.value = res.result
    detail.value.graph = JSON.parse(res.result.graph || '{}')
    detail.value.style = {}
  })
}

// 保存
function save(graph: any) {
  const {
    id
  } = detail.value

  const {
    coding,
    updateApi
  } = props.data
  const param: any = {
    id,
    graph
  }

  store.dispatch('common/Fetch', {
    api: updateApi || 'updateGraph',
    data: {
      coding: coding,
      ...param
    }
  }).then(res => {
    proxy.$message.message({
      msg: "保存成功"
    })
  })
}

onMounted(() => {
  init()
})
</script>
