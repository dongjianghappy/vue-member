<template>
<v-button v-model:show="isShow">
  管理
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="" :action="action" :style="{width: 600, height: 600}" :data="data" @submit="submit">
  <template v-slot:content>
    <div>{{data.name}}</div>
    <div class="mt20 flex">
      <div style="flex: 1">
        内容列表
      </div>
      <div class="pt5 w100 align_right">
        <Detail3 :data="data" :render="init" />
      </div>
    </div>
    <div class="mt25" style="height:400px; overflow-y: auto;">
      <v-collapse :title="item.name" class="mb5" v-for="(item, index) in dataList.list" :key="index">
          <template v-slot:extra_left>
            <Detail3 action="edit" :data="{id: item.id, coding: data.coding}" :render="init" />
          </template>
          <template v-slot:extra>
            <Detail3 :data="{id: item.id, coding: data.coding}" level="2" :render="init" />
          </template>
          <ul class="form-wrap-box" style="padding: 0px 45px;">
            <li class="li mb15" v-for="(list, i) in item.list" :key="i">
              <span class="label">
                {{list.name}}
                <span><Detail3 action="edit" :data="{id: list.id, coding: data.coding}" level="2" :render="init" /></span>
              </span>
              
            </li>
          </ul>
        </v-collapse>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore
} from '@/utils'
import Detail3 from './detail3.vue'


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
      return
    }
  }
})
const store = useStore();
const dialog: any = ref(null)
const isShow = ref(false)
const dataList: any = ref([])
const detail: any = ref({
  id: "",
  name: "",
  url: ""
})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    init()
  }
})

function init(param: any = "") {

  store.dispatch('common/Fetch', {
    api: 'footprintDetail',
    data: {
      id: props.data.id
    }
  }).then(async res => {
       dataList.value = res.result
  })
}

function submit(params: any) {
  const {
    id,
    name,
    description,
  } = detail.value

  const param: any = {
    name: name,
    description: description,
  }

  if (props.action === 'edit') {
    param.id = id
  }

  store.dispatch('common/Fetch', {
    api: props.action === 'add' ? "Insert" : 'Update',
    data: {
      coding: props.data.coding,
      ...param
    }
  }).then(res => {
    props.render()
    isShow.value = false
  })
}
</script>
