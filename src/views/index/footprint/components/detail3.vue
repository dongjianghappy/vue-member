<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? '': '添加节点'}}
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" :title="action === 'add' ? '添加节点' : '编辑节点'" :action="action" :style="{width: 600, height: 600}" :data="{...data, coding: data.coding.list}" @submit="submit">
  <template v-slot:content>
    <ul class="edit-list">
      <li class="mb15">
        <div class="mb5">名称</div>
        <input type="text" v-model="detail.name" class="input-sm input-full">
      </li>
      <li class="mb15">
        <div class="mb5">节点类型</div>
        <v-radiobutton name="node_type" v-model:checked="detail.node_type" :enums="[{label: '圆形', value: '0'}, {label: '方形', value: '1'}]" />
      </li>
      <li class="mb15">
        <div class="mb5">线条颜色</div>
        <div class="flex">
          <input type="text" v-model="detail.line_color" class="input-sm input-150">
          <div style="flex: 1"><v-colorpicker @color="chooseColor" :color="detail.line_color" /></div>
        </div>
      </li>      
      <li class="mb15">
        <div class="mb5">描述</div>
        <textarea v-model="detail.content" placeholder="请输入描述" class="w-full"></textarea>
      </li>
      <li class="mb15">
        <div class="mb5">时间</div>
        <input type="text" v-model="detail.datetime" class="input-sm input-full">
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
  action: {
    type: String,
    default: "add"
  },  
  level: {
    type: String,
    default: '1'
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

    function chooseColor(param: any) {
      detail.value.line_color = param.value
    }

function submit(params: any) {
  const {
    id,
    name,
    node_type,
    line_color,
    content,
    datetime
  } = detail.value

  const param: any = {
    name,
    node_type,
    line_color,
    content,
    datetime
  }

      if (props.action === 'edit') {
    param.id = id
  }

  if(props.level === '1'){
    param.artid = props.data.id
  }else{
    param.fid = props.data.id
  }

  store.dispatch('common/Fetch', {
    api: props.action === 'add' ? "Insert" : 'Update',
    data: {
      coding: props.data.coding.list,
      ...param
    }
  }).then(res => {
    props.render()
    isShow.value = false
  })
}
</script>
