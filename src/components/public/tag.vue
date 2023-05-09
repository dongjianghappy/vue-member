<template>
<div id="tagInputContainer" class="tagInputContainer pr120" style="position:relative">
  <div class="tag-box" v-for="(item, index) in tags" :key="index" draggable="true" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)"><span>{{item}}</span> <a class="deltag" href="javascript:;" title="删除" @click="remove(index)" v-if="isEdit">×</a></div>
  <input v-model="model" v-if="isEdit" @blur="input" type="text" placeholder="请输入标签" style="border:0">
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from 'vue'

export default defineComponent({
  name: 'v-Tag',
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:tags'],
  setup(props, context) {
    let model: any = ref("")

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
        props.tags.push(model.value)
        model.value = ""
        context.emit('update:tags', props.tags)
      }
    }

    function remove(index: any) {
      props.tags.splice(index, 1)
      context.emit('update:tags', props.tags)
    }

    return {
      input,
      remove,
      model,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter
    }
  }
})
</script>
