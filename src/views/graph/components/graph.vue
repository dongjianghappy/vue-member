<template>
<v-button v-if="type !== 'text'" @click="handleclick">
  <i class="iconfont icon-chart" style="color: #f67f00;"></i>
</v-button>
<span v-else @click="handleclick" v-html="name" class="cursor"></span>
<v-dialog v-model:show="isShow" ref="form" :title="title || name" width="950px" height="600px" conheight="600px" :hasfooter="false" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <slot name="content">
     <Graph :data="data" :isShow="true" />
    </slot>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  watch
} from '@/utils'
import Graph from '../../../plugin/joint/index.vue'
export default defineComponent({
  name: 'v-Category',
  components: {
    Graph
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "button"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    api: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    isInt: {
      type: Boolean,
      default: false
    },
    // 是否更新
    isUpdate: {
      type: Boolean,
      default: false
    },
    operating: {
      type: String,
      default: ""
    },
  },
  emits: ['update:cate'],
  setup(props, context) {
    const isShow: any = ref(false)
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    let current: any = ref({})

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function choose(param: any) {
      current.value = param
    }

    return {
      isShow,
      current,
      handleclick,
      choose,
      dataList
    }
  }
})
</script>

<style scoped>
.current {
  background: #1890ff;
  border-radius: 2px;
  color: #fff;

}
</style>
