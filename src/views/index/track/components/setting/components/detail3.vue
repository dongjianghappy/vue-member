<template>
<div class="module-wrap absolute" style="background: rgb(34, 34, 34); top: 0; left: 0; right: 0; bottom: 0">
  <div class="module_head" style="padding: 25px 15px 0px 35px;">
    当前节点：{{data.basic.name}} {{action}}
    <span @click="handleReturn" class="right">
      <i class="iconfont icon-close" />
    </span>
  </div>
  <div class="module-content pl25" style="min-height: 500px">
    <div class="p15" v-if="action === 'add'">
      <DetailInfo :data="detail" />
      <span @click="submit">保存</span>
    </div>
    <v-tabs :tabs="[{name: '内容',value: 'image'},{name: '设置',value: 'talk'}]" :isEmit="true" v-model:index="index" v-else>
      <template v-slot:extra>
        <span @click="submit">保存</span>
      </template>      
      <template v-slot:content1>
        <DetailInfo :data="data.basic" @imagesTU="clooseImg" :action="action" />
      </template>
      <template v-slot:content2>
        <div style="height:500px; overflow: hidden; overflow-y: auto;">
          <!-- 文本属性 -->
          <v-collapse title="文本属性" :hasIcon="false" class="mb5">
            <ul class="edit-list p15">
              <li class="mb15 flex">
                <div class="mr25" style="flex: 1">
                  <div class="relative mb5">
                    字体大小
                    <input type="checkbox" v-model="data.basic.privacy_font_size_status" :checked="data.basic.privacy_font_size_status" class="absolute" style="top: 7px; right: 0;" />
                  </div>
                  <input type="text" v-model="data.basic.privacy_font_size" :disabled="!data.basic.privacy_font_size_status" class="input-sm input-full" @input="handleChange('privacy_font_size')">
                  <span class="font12 cl-666">统一大小：{{data.root.font_size}}，勾起私有设置</span>
                </div>
                <div style="flex: 1">
                  <div class="relative mb5">
                    字体颜色
                    <input type="checkbox" v-model="data.basic.privacy_font_color_status" :checked="data.basic.privacy_font_color_status" class="absolute" style="    top: 7px; right: 0;" />
                  </div>
                  <div class="flex relative">
                    <input type="text" v-model="data.basic.privacy_font_color" :disabled="!data.basic.privacy_font_color_status" class="input-sm input-full">
                    <div style="flex: 1; height: 32px;">
                      <v-colorpicker @color="chooseColor" :color="data.basic.privacy_font_color" attr="privacy_font_color" />
                    </div>
                  </div>
                  <span class="font12 cl-666">统一颜色：{{data.root.font_color}}，勾起私有设置</span>
                </div>
              </li>
            </ul>
          </v-collapse>

          <!-- 节点属性 -->
          <v-collapse title="节点属性" :hasIcon="false" class="mb5">
            <ul class="edit-list p15">
              <li class="mb15 flex">
                <div class="mr25" style="flex: 1">
                  <div class="mb5">节点类型</div>
                  <v-select :enums="nodeType" v-model:value="data.basic.node_type" :defaultValue="data.basic.node_type = data.basic.node_type || '0'" />
                </div>
                <div style="flex: 1">
                  <div class="mb5">节点形状</div>
                  <v-select :enums="nodeShape" v-model:value="data.basic.node_shape" :defaultValue="data.basic.node_shape = data.basic.node_shape || '0'" :disabled="data.basic.node_type !== 'basic'" />
                </div>
              </li>
              <li class="mb15" v-if="data.basic.node_type === 'icon'">
                <div class="mb5">图标</div>
                <div class="flex">
                  <input type="text" v-model="data.basic.icon" class="input-sm input-full" style="flex: 1" @input="handleChange('node_size')">
                  <div class="pl10 relative" style="width: 70px">
                    <v-popover content="选择图标" arrow="tb" offset="right" :move="-300" :keys="`static1_`">
                      <div style="display: flex; flex-wrap: wrap; padding: 16px; width: 350px">
                        <span style="width: 20%; padding: 10px 0px;" @click="handleIcon('home')"><i class="iconfont icon-home" style="color: rgb(153, 153, 153);"></i></span>
                      </div>
                    </v-popover>
                  </div>
                </div>
              </li>
              <li class="mb15 flex">
                <div class="mr25" style="flex: 1">
                  <div class="mb5">节点大小</div>
                  <input type="text" v-model="data.basic.node_size" class="input-sm input-full" @input="handleChange('node_size')">
                </div>
                <div style="flex: 1">
                  <div class="mb5">节点颜色</div>
                  <div class="flex relative">
                    <input type="text" v-model="data.basic.node_color" class="input-sm input-full">
                    <div style="flex: 1">
                      <v-colorpicker @color="chooseColor" :color="data.basic.node_color" attr="node_color" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </v-collapse>

          <!-- 提示框属性 -->
          <v-collapse title="提示框属性" :hasIcon="false" class="mb5">
            <ul class="edit-list p15">
              <li class="mb15">
                  <div class="mb5">提示框形状</div>
                  <v-select :enums="tripShape" v-model:value="data.basic.trip_shape" :defaultValue="data.basic.trip_shape = data.basic.trip_shape || 'rect'" />
                </li>
              <li class="mb15 flex" v-if="data.basic.trip_shape === 'rect'">
                <div class="mr25" style="flex: 1">
                  <div class="mb5">宽度</div>
                  <input type="text" v-model="data.basic.des_trip_width" class="input-sm input-full" @input="handleChange('des_trip_width')">
                </div>
                <div style="flex: 1">
                  <div class="mb5">高度</div>
                  <input type="text" v-model="data.basic.des_trip_height" class="input-sm input-full" @input="handleChange('des_trip_height')">
                </div>
              </li>
              <li class="mb15 flex" v v-else>
                <div style="flex: 1">
                  <div class="mb5">半径</div>
                  <input type="text" v-model="data.basic.trip_radius" class="input-sm input-full" @input="handleChange('trip_radius')">
                </div>
              </li>
              <li class="mb15 flex" v-if="data.basic.trip_shape === 'rect'">
                <div class="mr25" style="flex: 1">
                  <div class="mb5">描述框圆角样式</div>
                  <input type="text" v-model="data.basic.des_trip_style" class="input-sm input-full" @input="handleChange('des_trip_style')">
                </div>
                <div class="mr25" style="flex: 1">
                  <div class="mb5">描述框作用偏移</div>
                  <input type="text" v-model="data.basic.trip_offset" class="input-sm input-full" @input="handleChange('trip_offset')">
                </div>
              </li>
              <li class="mb15 flex">
                <div class="mr25" style="flex: 1">
                  <div class="mb5">描述显示方式</div>
                  <v-select :enums="[{name: '直接显示', value: 0}, {name: '点击显示', value: 1}]" v-model:value="data.basic.des_trip_type" :defaultValue="data.basic.des_trip_type = data.basic.des_trip_type ? data.basic.des_trip_type : '200'" />
                </div>
                <div style="flex: 1">
                  <div class="mb5">描述框背景色</div>
                  <div class="flex relative">
                    <input type="text" v-model="data.basic.des_trip_background" class="input-sm input-full" @input="handleChange('des_trip_background')">
                    <div style="flex: 1">
                      <v-colorpicker @color="chooseColor" :color="data.basic.des_trip_background" attr="des_trip_background" />
                    </div>
                  </div>
                </div>
              </li>
              <li class="flex">
                <div class="mr25" style="flex: 1">
                  <div class="mb5">描述字体大小</div>
                  <input type="text" v-model="data.basic.des_font_size" class="input-sm input-full" @input="handleChange('des_font_size')">
                </div>
                <div style="flex: 1">
                  <div class="mb5">描述字体颜色</div>
                  <div class="flex relative">
                    <input type="text" v-model="data.basic.des_font_color" class="input-sm input-full" @input="handleChange('des_font_color')">
                    <div style="flex: 1">
                      <v-colorpicker @color="chooseColor" :color="data.basic.des_font_color" attr="des_font_color" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </v-collapse>

          <!-- 线条属性 -->
          <v-collapse title="线条属性" :hasIcon="false" class="mb5">
            <ul class="edit-list p15">
              <li class="mb15 flex">
                <div class="mr25" style="flex: 1">
                  <div class="mb5">节点 x 间距</div>
                  <v-select :enums="spaceX" v-model:value="data.basic.space_x" :defaultValue="data.basic.space_x || '200'" @input="handleChange('space_x')" />
                </div>
                <div style="flex: 1">
                  <div class="mb5">节点 y 间距</div>
                  <v-select :enums="spaceY" v-model:value="data.basic.space_y" :defaultValue="data.basic.space_y = data.basic.space_y ? data.basic.space_y : '200'" @input="handleChange('space_y')" />
                </div>
              </li>
              <li class="mb15 flex">
                <div class="mr25" style="width: 50%">
                  <div class="mb5">节点连接线</div>
                  <v-select :enums="[{name: '直线', value: 0}, {name: '曲线', value: 1}]" v-model:value="data.basic.connect_line" :defaultValue="data.basic.connect_line = data.basic.connect_line || 0" />
                </div>
                <div style="width: 50%">
                  <div class="mb5">线样式</div>
                  <v-select :enums="[{name: '实线', value: 0}, {name: '虚线', value: 1}]" v-model:value="data.basic.line_style" :defaultValue="data.basic.line_style = data.basic.line_style ||  0" />
                </div>
                <div style="flex: 1"></div>
              </li>
              <li class="mb15 flex">
                <div class="mr25" style="width: 33.333333%">
                  <div class="mb5">线条方向</div>
                  <v-select :enums="[{name: '主线上方', value: 0}, {name: '主线下方', value: 1}]" v-model:value="data.basic.line_direction" :defaultValue="data.basic.line_direction = data.basic.line_direction || 0" @input="handleChange('line_direction')" />
                </div>
                <div class="mr25" style="width: 33.333333%">
                  <div class="mb5">线条粗细</div>
                  <div class="flex">
                    <input type="text" v-model="data.basic.line_width" class="input-sm input-full" @input="handleChange('line_width')">
                  </div>
                </div>
                <div style="width: 33.333333%">
                  <div class="mb5">线条颜色</div>
                  <div class="flex relative">
                    <input type="text" v-model="data.basic.line_color" class="input-sm input-full" @input="handleChange('line_width')">
                    <div style="flex: 1">
                      <v-colorpicker @color="chooseColor" :color="data.basic.line_color" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </v-collapse>
          <!-- 子节点属性 -->
          <v-collapse title="子节点" :hasIcon="false" class="mb5">
            <ul class="edit-list p15">
              <li class="flex">
                <div class="mr25" style="flex: 1">
                  <div class="mb5">字体大小</div>
                  <input type="text" v-model="data.basic.font_size" class="input-sm input-full" @input="handleChange('font_size')">
                </div>
                <div style="flex: 1">
                  <div class="mb5">字体颜色</div>
                  <div class="flex relative">
                    <input type="text" v-model="data.basic.font_color" class="input-sm input-full" @input="handleChange('font_color')">
                    <div style="flex: 1">
                      <v-colorpicker @color="chooseColor" :color="data.basic.font_color" attr="font_color" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </v-collapse>
        </div>
      </template>
    </v-tabs>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore,
  codings
} from '@/utils'

import {
  trackmapType,
  spaceX,
  spaceY,
  nodeType,
  nodeShape,
  tripStyle,
  tripShape
} from '@/assets/const'

import DetailInfo from './detailInfo.vue'
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
  ccccc: {
    type: Object,
    default: () => {
      return {}
    }
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
const emit: any = defineEmits(['action'])
const store = useStore();
const dialog: any = ref(null)
const coding: any = codings.track
const detail: any = ref({
  id: "",
  name: "",
  content: "",
  status: 1,
  url_type: '1',
  url: "",
  des_display: 1
})
 
function handleReturn() {
  props.ccccc.status = false
}

function handleIcon(param: any) {
  props.data.basic.icon = param
}

function clooseImg(param: any) {
  emit('imagesTU', param)
}

function handleChange(param: any) {
  props.data.basic.list && props.data.basic.list.forEach((item: any, index: any) => {
    let space_y = parseInt(props.data.basic.space_y)
    let y = parseInt(props.data.basic.config.y)

    // 坐标处理    
    if (param === 'space_x' || param === 'space_y') {
      if (param === 'space_x') {
        item.config.x = props.data.basic.config.x + props.data.basic[param] * (index + 1)
      } else {
        let _y: any = props.data.basic.line_direction == '0' ? y - space_y * 1 : y + space_y * 1 + space_y;
        item.config.y = _y
      }
    }
    // 线方向
    else if (param === 'line_direction') {
      let _y: any = props.data.basic.line_direction == '0' ? y - space_y * 1 : y + space_y * 1 + space_y;
      item.config.y = _y
    } else {
      item.config[param] = props.data.basic[param]
    }
  });
}

function chooseColor(param: any) {
  props.data.basic[param.attr] = param.value
  props.data.basic.list && props.data.basic.list.forEach((item: any) => {
    item.config[param.attr] = param.value
  });
}

function submit(params: any) {
  const {
    id,
    name,
    node_type,
    node_shape,
    privacy_font_size,
    privacy_font_color,
    privacy_font_size_status,
    privacy_font_color_status,
    font_size,
    font_color,
    des_display,
    des_trip_type,
    trip_shape,
    trip_offset,
    des_trip_width,
    des_trip_height,
    trip_radius,
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
    image,
    img,
    content,
    status,
    url_type,
    url,
    datetime
  } = props.data.basic

  let param: any = {}

  if (props.action === 'edit') {
    let img_str: any = ""
    if (img.length) {
      img_str = "|"
      for (let i = 0; i < img.length; i++) {
        const arr = img[i].split("/")
        img_str += arr[arr.length - 1] + "|"
      }
    }
    debugger
    param = {
      name,
      node_type,
      node_shape,
      privacy_font_size: privacy_font_size || '12',
      privacy_font_color: privacy_font_color || '#333',
      privacy_font_size_status: privacy_font_size_status === true ? 1 : 0,
      privacy_font_color_status: privacy_font_color_status === true ? 1 : 0,
      font_size: font_size || '12',
      font_color: font_color || '#333',
      des_display: des_display === true ? 1 : 0,
      des_trip_type,
      trip_shape: trip_shape || 'rect',
      trip_offset: trip_offset || '50',
      des_trip_width: des_trip_width || '200',
      des_trip_height: des_trip_height || '100',
      trip_radius: trip_radius || '35',
      des_trip_style,
      des_trip_background: des_trip_background || '#333',
      des_font_size: des_font_size || '12',
      des_font_color: des_font_color || '#ccc',
      space_x: space_x || 300,
      space_y: space_y || 150,
      connect_line,
      line_style,
      line_direction,
      line_width,
      line_color,
      image: img_str,
      content,
      status,
      url_type,
      url,
      datetime
    }

    param.id = id
  } else {
    const {
      name,
      content,
      status,
      url,
      des_display
    } = detail.value
    param = {
      name,
      content,
      status,
      url_type,
      url,
      node_type: 'circle',
      node_shape: '',
      font_size: font_size || '12',
      font_color: font_color || '#333',
      trip_shape: trip_shape || 'rect',
      trip_offset: trip_offset || '50',
      des_trip_width: des_trip_width || '200',
      des_trip_height: des_trip_height || '100',
      trip_radius: trip_radius || '35',
      des_trip_background: des_trip_background || '#333',
      des_font_size: des_font_size || '12',
      des_font_color: des_font_color || '#ccc',
      des_display: des_display === true ? 1 : 0,
      space_x: space_x || 300,
      space_y: space_y || 150,
    }

    if (props.data.root.isRoot) {
      param.artid = props.data.root.id
    } else {
      param.fid = props.data.root.id
    }
  }

  store.dispatch('common/Fetch', {
    api: props.action === 'add' ? "Insert" : 'Update',
    data: {
      coding: coding.list,
      ...param
    }
  }).then(res => {
    props.render()
    props.ccccc.status = false
  })
}
</script>
