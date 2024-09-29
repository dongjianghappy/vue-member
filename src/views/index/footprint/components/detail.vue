<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? '': '添加记录'}}
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" :title="action === 'add' ? '添加记录' : '编辑记录'" :action="action" :style="{width: 600, height: 450}" :data="{...data, coding: data.coding.art}" @submit="submit">
  <template v-slot:content>
    <ul class="edit-list">
      <li class="mb15">
        <div class="mb5">名称</div>
        <input type="text" v-model="detail.name" class="input-sm input-full">
      </li>
      <li class="mb15 flex">
        <div class="mr25" style="flex: 1">
        <div class="mb5">轨道图类型</div>
          <v-select :enums="displayType" v-model:value="detail.display_type" :defaultValue="detail.display_type = detail.display_type ? detail.display_type : '0'" />
        </div>
        <div style="width: 50%">
        <div class="mb5">主线条颜色</div>
        <div class="flex">
          <input type="text" v-model="detail.line_color" class="input-sm input-150">
          <div style="flex: 1"><v-colorpicker @color="chooseColor" :color="detail.line_color" /></div>
        </div>
        </div>
      </li>
      <li class="mb15">
        <div class="mb5">内容类型</div>
        <v-select :enums="trackmapType" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : '0'" />
      </li>
      <li>
        <div class="mb5">描述</div>
        <textarea v-model="detail.description" placeholder="请输入描述" class="w-full"></textarea>
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
const trackmapType: any = ref([{
  name: '内容详解',
  value: 0
},
{
  name: '行程轨迹',
  value: 1
}])

const displayType: any = ref([{
  name: '轨道1',
  value: 0
},
{
  name: '轨道2',
  value: 1
},
{
  name: '轨道3',
  value: 2
}])
const detail: any = ref({})

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
    display_type,
    line_color,
    type,
    description
  } = detail.value

  const param: any = {
    name: name,
    display_type,
    line_color,
    type,
    description
  }

    if (props.action === 'edit') {
    param.id = id
  }

  store.dispatch('common/Fetch', {
    api: props.action === 'add' ? "Insert" : 'Update',
    data: {
      coding: props.data.coding.art,
      ...param
    }
  }).then(res => {
    props.render()
    isShow.value = false
  })
}
</script>
