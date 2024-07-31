<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? '': '添加日程'}}
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" :title="action === 'add' ? '添加日程' : '编辑日程'" :action="action" :style="{width: 550, height: 350}" width="520px" height="450px" :data="data" @submit="submit">
  <template v-slot:content>
    <ul class="edit-list">
      <li class="mb15">
        <div class="mb5">日程名称</div>
        <input type="text" v-model="detail.name" class="input-sm input-full">
      </li>
      <li>
        <div class="mb5">日程描述</div>
        <textarea v-model="detail.description" placeholder="请输入日程描述" class="w-full"></textarea>
      </li>
    </ul>
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
  },
  action: {
    type: String,
    default: 'add'
  }
})
const store = useStore();
const dialog: any = ref(null)
const isShow = ref(false)
const detail: any = ref({
  id: "",
  name: "",
  url: ""
})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
  }
})

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
