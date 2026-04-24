<template>
<ul>
  <template v-for="(item, index) in dataList" :key="index">
    <li class="mt10 mb10 relative" style="margin-left: 30px;" draggable="true" @dragend.stop="handleDragEnd($event, dataList)" @dragstart.stop="handleDragStart($event, item)" @dragenter.stop="handleDragEnter($event, dataList, item)" @dragover.prevent="handleDragOver($event)">
      <span class="absolute deg90" :class="{'deg360': item.extand}" style="left: -35px;" @click="handelExpand(item)" v-if="item.list && item.list.length">
        <i class="iconfont icon-arrow arrow"></i>
      </span>
      <span>
        <span>{{item.name}}
          <i class="iconfont icon-img" v-if="item.image" />
        </span>

        <v-space class="right">
          <i class="iconfont icon-edit" @click="handleAdd('edit' ,item)" />
          <Copy :data="item" :source="source" :render="render" />
          <i class="iconfont icon-recycle m0" @click="handleAdd(item)" />
          <i class="iconfont icon-anonymous-iconfont m0" level="2" @click="handleAdd('add', {} ,item)" />
          <v-switch :data="{ item, field: 'status', coding: coding.list }" className="right" @toggle="getValue" :auth="true" />
        </v-space>
      </span>
      <List :source="source" :dataList="item.list" :handleAdd="handleAdd" v-if="item.list" :class="{'extand': item.extand}" :checkedList="checkedList" :render="render" />
    </li>
  </template>
</ul>
</template>

<script setup lang="ts">
import { codings, useStore } from '@/utils'
import {
  defineProps,
  ref
} from 'vue'

import List from './list.vue'
import Copy from './copy.vue'
import VueEvent from '@/utils/event'
const props: any = defineProps({
  dataList: {
    type: Object,
    default: () => {
      return {}
    }
  },
  source: {
    type: Object,
    default: () => {
      return {}
    }
  },
  handleAdd: {
    type: Function,
    default: () => {
      return
    }
  },
  render: {
    type: Function,
    default: () => {
      return 
    }
  }
})

const store = useStore()
const coding = codings.track
const dragging: any = ref(null)
const moveIndex: any = ref("")
const enterIndex: any = ref("")

function handleDragStart(e: any, item: any) {
  dragging.value = item
}

function handleDragEnd(e: any, list: any) {
  VueEvent.emit("isMove");
  let item = list.splice(enterIndex.value, 1, dragging.value)[0]; // 这一步是将要替换的删除，并将移动的插入，最后返回被删除的数组
  list[moveIndex.value] = item;
  
  moveSave(list)
}

function handleDragOver(e: any) {
  e.dataTransfer.dropEffect = 'move'
}

function handleDragEnter(e: any, list: any, item: any) {
  e.dataTransfer.effectAllowed = 'move'

  if (item === dragging.value) {
    return
  }
  const newItems = list
  moveIndex.value = newItems.findIndex((i: any) => {
    return i === dragging.value
  })

  enterIndex.value = newItems.findIndex((i: any) => {
    return i === item
  })
}

function moveSave(list: any) {
  console.log("111111");
  
  let form: any = []
  list.map((item: any, index: any) => {
    item.sort = 1 + index
    form.push({
      id: item.id,
      sort: item.sort,
    })
  })
  store.dispatch('common/Fetch', {
    api: 'updateSave',
    data: {
      coding: coding.list,
      data: JSON.stringify(form),
    }
  }).then(() => {
    debugger
    props.render()
  })
}

function handelExpand(param: any) {
  param.extand = !param.extand
}
</script>

<style scoped>
.deg360 {
  transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  /* IE 9 */
  -moz-transform: rotate(360deg);
  /* Firefox */
  -webkit-transform: rotate(360deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(360deg);
  /* Opera */
}

.extand {
  display: none;
}
</style>
