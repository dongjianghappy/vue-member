<template>
<div id="tagInputContainer" class="tagInputContainer pr25" style="position:relative">
  <div class="tag-box" v-for="(item, index) in tags" :key="index" draggable="true" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)"><span>{{item}}</span> <a class="deltag" href="javascript:;" title="删除" @click="remove(index)" v-if="isEdit">×</a></div>
  <input v-model="model" v-if="isEdit" @keyup.enter="input" @blur="input" type="text" placeholder="多个词使用'/'或','隔开" style="border:0">
  <span><i class="iconfont icon-recycle absolute" style="top: 5px; right: -25px;" @click="handleClear" /></span>
  <span class="absolute" style="top: 5px; right: -50px;" @click="handleaaaa">转换</span>
</div>
<div>{{strings}}</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
} from 'vue'

const props: any = defineProps({
  tags: {
    type: Array,
    default: () => []
  },
  isEdit: {
    type: Boolean,
    default: true
  }
})
const emit: any = defineEmits(['update:tags'])
let model: any = ref("")
let strings: any = ref("")

const dragging: any = ref(null)
const box: any = ref(0)
const moveIndex: any = ref("")
const enterIndex: any = ref("")

function handleDragStart(e: any, item: any) {
  dragging.value = item
}

function handleDragEnd(e: any, item: any) {
  item = props.tags.splice(enterIndex.value, 1, dragging.value)[0]; // 这一步是将要替换的删除，并将移动的插入，最后返回被删除的数组
  props.tags[moveIndex.value] = item;
  document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
}

function handleDragOver(e: any) {
  e.dataTransfer.dropEffect = 'move'
}

function handleDragEnter(e: any, item: any) {
  e.dataTransfer.effectAllowed = 'move'

  if (item === dragging.value) {
    return
  }
  const newItems = props.tags

  moveIndex.value = newItems.findIndex((i: any) => {
    return i === dragging.value
  })

  enterIndex.value = newItems.findIndex((i: any) => {
    return i === item
  })

  if (box.value !== enterIndex.value) {
    document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
  }

  document.querySelectorAll('ul>li')[enterIndex.value].setAttribute("class", "current")
  box.value = enterIndex.value
}

function input() {
  if (model.value !== "") {
    model.value = model.value.replaceAll(',', '/')
    let words = []
    if (model.value.indexOf("/") > -1) {
      words = model.value.split("/")
    }

    if (words.length > 0) {
      for (let i = 0; i < words.length; i++) {
        if (props.tags.indexOf(words[i]) === -1) {
          props.tags.push(words[i])
        }
      }
    } else {
      if (props.tags.indexOf(model.value) === -1) {
        props.tags.push(model.value)
      }
    }

    model.value = ""
    emit('update:tags', props.tags)
  }
}

function remove(index: any) {
  props.tags.splice(index, 1)
  emit('update:tags', props.tags)
}

function handleClear() {
  emit('update:tags', [])
}

function handleaaaa() {
  if (strings.value) {
    strings.value = ""
  } else {
    strings.value = props.tags.join(',')
  }
}
</script>
