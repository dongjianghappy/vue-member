<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? '': '添加记录'}}
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" :title="action === 'add' ? '添加记录' : '编辑记录'" :action="action" :style="{width: 600, height: 600}" :data="{...data, coding: data.coding.art}" @submit="submit">
  <template v-slot:content>
    <v-tabs :tabs="[{name: '内容',value: 'image'},{name: '设置',value: 'talk'}]" :isEmit="true" v-model:index="index">
      <template v-slot:content1>
        <ul class="edit-list">
      <li class="mb15">
        <div class="mb5">名称</div>
        <input type="text" v-model="detail.name" class="input-sm input-full">
      </li>
      <li>
        <div class="mb5">状态</div>
        <div style="width: 120px;">
          <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
          <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
        </div>
      </li>   
      <li>
        <div class="mb5">描述</div>
        <textarea v-model="detail.description" placeholder="请输入描述" class="w-full"></textarea>
      </li>
    </ul>
      </template>      
      <template v-slot:content2>
        <ul class="edit-list">
          <li class="mb15">
        <div class="mb5">内容类型</div>
        <v-select :enums="trackmapType" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : '0'" />
      </li>  
      <li class="mb15 flex">
        <div class="mr25" style="flex: 1">
          <div class="mb5">字体大小</div>
          <input type="text" v-model="detail.font_size" class="input-sm input-full">
        </div>
                <div style="flex: 1">
          <div class="mb5">字体颜色</div>
          <div class="flex">
            <input type="text" v-model="detail.font_color" class="input-sm input-full">
            <div style="flex: 1">
              <v-colorpicker @color="chooseColor" :color="detail.font_color" attr="font_color" />
            </div>
          </div>
        </div>
      </li>    
      <li class="mb15 flex">
        <div class="mr25" style="flex: 1">
          <div class="mb5">主轴节点X间距</div>
          <v-select :enums="spaceX" v-model:value="detail.space_x" :defaultValue="detail.space_x = detail.space_x ? detail.space_x : '200'" />
        </div>
                <div style="flex: 1">
          <div class="mb5">主轴节点y间距</div>
          <v-select :enums="spaceY" v-model:value="detail.space_y" :defaultValue="detail.space_y = detail.space_y ? detail.space_y : '150'" />
        </div>
      </li>
      <li class="mb15 flex">
        <div class="mr25" style="flex: 1">
          <div class="mb5">轨道图类型</div>
          <v-select :enums="displayType" v-model:value="detail.display_type" :defaultValue="detail.display_type = detail.display_type ? detail.display_type : '0'" />
        </div>
        <div  class="mr25" style="width: 30%">
          <div class="mb5">主线粗细</div>
          <div class="flex">
            <input type="text" v-model="detail.line_width" class="input-sm input-full">
          </div>
        </div>        
        <div style="width: 30%">
          <div class="mb5">主线条颜色</div>
          <div class="flex">
            <input type="text" v-model="detail.line_color" class="input-sm input-full">
            <div style="flex: 1">
              <v-colorpicker @color="chooseColor" :color="detail.line_color" attr="line_color" />
            </div>
          </div>
        </div>
      </li>
    </ul>
      </template>
    </v-tabs>
    
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
const spaceX = [{name: 50, value: 50}, {name: 100, value: 100}, {name: 150, value: 150}, {name: 200, value: 200}, {name: 250, value: 250}, {name: 300, value: 300}]
const spaceY = [{name: 50, value: 50}, {name: 100, value: 100}, {name: 150, value: 150}, {name: 200, value: 200}, {name: 250, value: 250}, {name: 300, value: 300}]
const trackmapType: any = ref([{
    name: '内容详解',
    value: 0
  },
  {
    name: '行程轨迹',
    value: 1
  }
])

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
  }
])
const detail: any = ref({})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
  }
})

function chooseColor(param: any) {
  detail.value[param.attr] = param.value
}

function submit(params: any) {
  const {
    id,
    name,
    display_type,
    font_size,
    font_color,
    space_x,
    space_y,
    line_width,
    line_color,
    type,
    description,
    status
  } = detail.value

  const param: any = {
    name: name,
    display_type,
    font_size: font_size || '12',
    font_color: font_color || '#333',
    space_x,
    space_y,
    line_width,
    line_color,
    type,
    description,
    status
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
