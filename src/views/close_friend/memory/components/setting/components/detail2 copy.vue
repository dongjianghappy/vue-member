<template>
<div class="plr15">
  <div class="flex">
    <div style="flex: 1">
      <span>全部展开或关闭</span>
    </div>
    <div class="pt5 w100 align_right">
      <i class="iconfont icon-anonymous-iconfont" @click="handleAdd('add' ,{}, data, true)" />
    </div>
  </div>
  <div style="height:480px; overflow-y: auto;">
    <template v-if="data.list && data.list.length > 0">
      <v-collapse :title="item.name" class="mb5" v-for="(item, index) in data.list" :key="index">
        <template v-slot:extra_left>
          <i class="iconfont icon-edit" @click="handleAdd('edit' ,item, data)" />
        </template>
        <template v-slot:extra>
          <v-space>
            <i class="iconfont icon-anonymous-iconfont" level="2" @click="handleAdd('add', {} ,item)" />
            <v-switch :data="{ item, field: 'status', coding: data.coding.list }" className="right" @toggle="getValue" :auth="true" />
          </v-space>
        </template>
        <ul class="form-wrap-box" style="padding: 5px 10px 5px 45px;" v-if="item.list && item.list.length > 0">
          <li class="li mb15" v-for="(list, i) in item.list" :key="i">
            <span class="label">
              {{list.name}}
              <span><i class="iconfont icon-edit" level="2" @click="handleAdd('edit' ,list, item)" /></span>
            </span>
            <v-switch :data="{ item: list, field: 'status', coding: data.coding.list }" className="right" @toggle="getValue" :auth="true" />
          </li>
        </ul>
      </v-collapse>
    </template>
    <v-nodata v-else trip="暂时还没有节点" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
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

const emit: any = defineEmits(['action'])
const store = useStore();
const dialog: any = ref(null)
const isShow = ref(false)
const detail: any = ref({})

function handleAdd(type: any, param: any, parent: any = {}, isRoot: any = false) {
  parent.isRoot = isRoot
  emit('action', type, param, parent)
}

function getValue(param: any) {
  props.render()
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
