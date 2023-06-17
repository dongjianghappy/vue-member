<template>
<div class="mb15 font12" style="color: #939393;">单击修改分组名称，拖拽调整分组顺序</div>
<div class="tagInputContainer" style="border: none; position:relative">
  <div class="cate-box" v-for="(item, index) in group" :key="index" draggable="true" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)"><span>
      <AddGround action="edit" :render="render" :title="item.name" :data="{...item, coding}" />
    </span>
    <v-confirm name="×" type="text" operating="delete" :auth="true" :submit="(param)=>remove(item, index, param)"></v-confirm>
  </div>
  <div class="cate-box add-ground">
    <AddGround :render="render" :data="{coding}" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from 'vue'
import AddGround from './addGround.vue'

export default defineComponent({
  name: 'v-Group',
  components: {
    AddGround,
  },
  props: {
    group: {
      type: Array,
      default: () => []
    },
    coding: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  emits: ['update:group', 'submit'],
  setup(props, context) {

    const dragging: any = ref(null)
    const box: any = ref(0)
    const moveIndex: any = ref("")
    const enterIndex: any = ref("")
    const form: any = ref({
      id: "",
      name: "",
      description: ""
    })

    function handleDragStart(e: any, item: any) {
      dragging.value = item
    }

    function handleDragEnd(e: any, item: any) {
      item = props.group.splice(enterIndex.value, 1, dragging.value)[0]; // 这一步是将要替换的删除，并将移动的插入，最后返回被删除的数组
      props.group[moveIndex.value] = item;
      document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
      context.emit('submit', {
        action: 'move'
      })
    }

    function handleDragOver(e: any) {
      e.dataTransfer.dropEffect = 'move'
    }

    function handleDragEnter(e: any, item: any) {
      e.dataTransfer.effectAllowed = 'move'

      if (item === dragging.value) {
        return
      }
      const newItems = props.group

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

    function remove(item: any, index: any, param: any) {
      form.value = {
        id: item.id,
        name: item.name,
        description: item.description
      }

      context.emit('submit', {
        action: 'delete',
        data: form.value,
        ...param
      })

    }

    return {
      remove,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
      form,
    }
  }
})
</script>
