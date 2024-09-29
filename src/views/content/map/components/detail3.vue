<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" :title="action === 'add' ? '添加节点' : '编辑节点'" :action="action" :style="{width: 600, height: 600}" :data="{...data, coding: data.coding.list}" @submit="submit">
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
      <li class="mb15">
        <div class="mb5">描述</div>
        <textarea v-model="detail.content" placeholder="请输入描述" class="w-full"></textarea>
      </li>
      <li class="mb15">
        <div class="mb5">链接</div>
        <input type="text" v-model="detail.url" class="input-sm input-full">
      </li>
    </ul>
      </template>
      <template v-slot:content2>
<ul class="edit-list" style="height:400px; overflow: hidden; overflow-y: auto;">
  <li class="mb15">
<div class="mb5">节点类型</div>
        <v-select :enums="nodeType" v-model:value="detail.node_type" :defaultValue="detail.node_type = detail.node_type ? detail.node_type : '0'" />
  </li>
<li class="flex">
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
            <li class="mt25 mb15">
        <div class="mb5">描述是否展示</div>
        <div style="width: 120px;">
          <v-radio label="是" name="des_display" value="1" v-model:checked="detail.des_display" />
          <v-radio label="否" name="des_display" value="0" v-model:checked="detail.des_display" />
        </div>
      </li>
      <li class="mb15 flex" v-if="detail.des_display === '1'">
                <div class="mr25" style="width: 33.333333%">
          <div class="mb5">描述显示方式</div>
          <v-select :enums="[{name: '直接显示', value: 0}, {name: '点击显示', value: 1}]" v-model:value="detail.des_trip_type" :defaultValue="detail.des_trip_type = detail.des_trip_type ? detail.des_trip_type : '200'" />
        </div>
        <div class="mr25" style="width: 33.333333%">
          <div class="mb5">描述提示框样式</div>
          <v-select :enums="spaceY" v-model:value="detail.des_trip_style" :defaultValue="detail.des_trip_style = detail.des_trip_style ? detail.des_trip_style : '200'" />
        </div>
        <div style="width: 33.333333%">
          <div class="mb5">描述提示框背景色</div>
          <div class="flex">
            <input type="text" v-model="detail.des_trip_background" class="input-sm input-full">
            <div style="flex: 1">
              <v-colorpicker @color="chooseColor" :color="detail.des_trip_background" attr="des_trip_background" />
            </div>
          </div>
        </div>
      </li>
      <li class="flex" v-if="detail.des_display === '1'">
        <div class="mr25" style="flex: 1">
          <div class="mb5">描述字体大小</div>
          <input type="text" v-model="detail.des_font_size" class="input-sm input-full">
        </div>
                <div style="flex: 1">
          <div class="mb5">描述字体颜色</div>
          <div class="flex">
            <input type="text" v-model="detail.des_font_color" class="input-sm input-full">
            <div style="flex: 1">
              <v-colorpicker @color="chooseColor" :color="detail.des_font_color" attr="des_font_color" />
            </div>
          </div>
        </div>
      </li>
      <li class="mt25 mb15 flex">
                <div class="mr25" style="flex: 1">
          <div class="mb5">节点 x 间距</div>
          <v-select :enums="spaceX" v-model:value="detail.space_x" :defaultValue="detail.space_x = detail.space_x ? detail.space_x : '200'" />
        </div>
        <div style="flex: 1">
          <div class="mb5">节点 y 间距</div>
          <v-select :enums="spaceY" v-model:value="detail.space_y" :defaultValue="detail.space_y = detail.space_y ? detail.space_y : '200'" />
        </div>
      </li>
      <li class="mb15 flex">
        <!-- <div class="mr25" style="width: 33.333333%">
          <div class="mb5">线条方向</div>
          <v-select :enums="[{name: '主线上方', value: 0}, {name: '主线下方', value: 1}]" v-model:value="detail.line_direction" :defaultValue="detail.line_direction = detail.line_direction ? detail.line_direction : 0" />
        </div> -->
        <div class="mr25" style="width: 50%">
          <div class="mb5">节点连接线</div>
            <v-select :enums="[{name: '直线', value: 0}, {name: '曲线', value: 1}]" v-model:value="detail.connect_line" :defaultValue="detail.connect_line = detail.connect_line ? detail.connect_line : 0" />
          
        </div>
        <div style="width: 50%">
          <div class="mb5">线样式</div>
          <v-select :enums="[{name: '实线', value: 0}, {name: '虚线', value: 1}]" v-model:value="detail.line_style" :defaultValue="detail.line_style = detail.line_style ? detail.line_style : 0" />
        </div>
        <div style="flex: 1"></div>
      </li>
      <li class="mb15 flex">
        <div class="mr25" style="width: 33.333333%">
          <div class="mb5">线条方向</div>
          <v-select :enums="[{name: '主线上方', value: 0}, {name: '主线下方', value: 1}]" v-model:value="detail.line_direction" :defaultValue="detail.line_direction = detail.line_direction ? detail.line_direction : 0" />
        </div>
        <div class="mr25" style="width: 33.333333%">
          <div class="mb5">主线粗细</div>
          <div class="flex">
            <input type="text" v-model="detail.line_width" class="input-sm input-full">
          </div>
        </div>
        <div style="width: 33.333333%">
          <div class="mb5">主线条颜色</div>
          <div class="flex">
            <input type="text" v-model="detail.line_color" class="input-sm input-full">
            <div style="flex: 1">
              <v-colorpicker @color="chooseColor" :color="detail.line_color" />
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
const spaceX = [{
  name: 50,
  value: 50
}, {
  name: 100,
  value: 100
}, {
  name: 150,
  value: 150
}, {
  name: 200,
  value: 200
}, {
  name: 250,
  value: 250
}, {
  name: 300,
  value: 300
}]
const spaceY = [{
  name: 50,
  value: 50
}, {
  name: 100,
  value: 100
}, {
  name: 150,
  value: 150
}, {
  name: 200,
  value: 200
}, {
  name: 250,
  value: 250
}, {
  name: 300,
  value: 300
}]
const nodeType = [{
  name: '圆形',
  value: 'circle'
}, {
  name: '方形',
  value: 'rect'
}]

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
    node_type,
    font_size,
    font_color,
    des_display,
    des_trip_type,
    des_trip_style,
    des_trip_background,
    des_font_size,
    des_font_color,
    space_x,
    space_y,
    connect_line,
    line_style,
    line_direction,
    line_width,
    line_color,
    content,
    url,
    datetime
  } = detail.value

  const param: any = {
    name,
    node_type,
    font_size: font_size || '12',
    font_color: font_color || '#333',
    des_display,
    des_trip_type,
    des_trip_style,
    des_trip_background,
    des_font_size,
    des_font_color,
    space_x,
    space_y,
    connect_line,
    line_style,
    line_direction,
    line_width,
    line_color,
    content,
    url,
    datetime
  }

  if (props.action === 'edit') {
    param.id = id
    if (props.level === '1') {
      param.artid = props.data.id
    } else {
      param.fid = props.data.id
    }
  } else {
    if (props.level === '1') {
      param.artid = props.data.artid
    } else {
      param.fid = props.data.fid
    }
  }

  if (props.level === '1') {
    param.artid = props.data.artid
  } else {
    param.fid = props.data.fid
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
