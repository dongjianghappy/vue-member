<template>
<v-tabs :tabs="[{name: '内容',value: 'image'},{name: '主轴设置',value: 'talk'}]">
  <template v-slot:extra>
    <span @click="submit">保存</span>
  </template>
  <template v-slot:content1>
    <ul class="edit-list" style="height:480px; overflow-y: auto;">
      <li class="mb15">
        <div class="mb5">
          示意图名称
          <span class="right"><v-visible v-model:visible="data.visible" /></span>
        </div>
        <input type="text" v-model="data.name" class="input-sm input-full">
      </li>
      <li>
        <div class="mb5">状态</div>
        <div style="width: 120px;">
          <v-radio label="是" name="status" value="1" v-model:checked="data.status" />
          <v-radio label="否" name="status" value="0" v-model:checked="data.status" />
        </div>
      </li>
      <li>
        <div class="mb5">示意图描述</div>
        <textarea v-model="data.description" placeholder="请输入描述" class="w-full"></textarea>
      </li>
      <li>
        <div class="mb5" @click="hanleClick">关联内容</div>
        <div class="flex p15" style="background: var(--card-background)">
          <div style="flex: 1">
            {{data.type ? '已关联' : '未关联'}}
          </div>
          <div class="w200 align_right" v-if="data.type">
            <span class="mr15" @click="handleView(data)">查看</span>
            <span @click="handleBind(data)">解除关联</span>
          </div>
        </div>
      </li>
      <li>
        <div class="mt15">图库管理</div>
        <div class="flex p15" style="background: var(--card-background)">
          <div style="flex: 1">
            <span @click="hanleClick">点击管理</span>
          </div>
          <div class="w200 align_right">
            {{data.img && data.img.length}}张
          </div>
        </div>
      </li>
    </ul>
  </template>
  <template v-slot:content2>
    <!-- 节点属性 -->
    <v-collapse title="节点属性" :hasIcon="false" class="mb5">
      <ul class="edit-list p15">
        <li class="mb15 flex">
          <div class="mr25" style="flex: 1">
            <div class="mb5">字体大小</div>
            <input type="text" v-model="data.font_size" class="input-sm input-full" @input="handleChange('font_size')">
          </div>
          <div style="flex: 1">
            <div class="mb5">字体颜色</div>
            <div class="flex relative">
              <input type="text" v-model="data.font_color" class="input-sm input-full">
              <div style="flex: 1">
                <v-colorpicker @color="chooseColor" :color="data.font_color" attr="font_color" />
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
            <div class="mb5">主轴节点X间距</div>
            <v-select :enums="spaceX" v-model:value="data.space_x" :defaultValue="data.space_x = data.space_x ? data.space_x : '200'" @input="handleChange('space_x')" />
          </div>
          <div style="flex: 1">
            <div class="mb5">主轴节点y间距</div>
            <v-select :enums="spaceY" v-model:value="data.space_y" :defaultValue="data.space_y = data.space_y ? data.space_y : '150'" @input="handleChange('space_y')" />
          </div>
        </li>
        <li class="mb15 flex">
          <div class="mr25" style="flex: 1">
            <div class="mb5">主轴粗细</div>
            <div class="flex">
              <input type="text" v-model="data.line_width" class="input-sm input-full" @input="handleChange('line_width')">
            </div>
          </div>
          <div style="flex: 1">
            <div class="mb5">主轴颜色</div>
            <div class="flex relative">
              <input type="text" v-model="data.line_color" class="input-sm input-full">
              <div style="flex: 1">
                <v-colorpicker @color="chooseColor" :color="data.line_color" attr="line_color" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </v-collapse>
  </template>
</v-tabs>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore,
  useRouter,
  codings
} from '@/utils'
import {
  trackmapType,
  spaceX,
  spaceY
} from '@/assets/const'

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
  }
})
const emit: any = defineEmits(['action'])
const store = useStore();
const router = useRouter()
const coding = codings.track
const detail: any = ref({})

function handleChange(param: any) {
  props.data.list.forEach((item: any, index: any) => {
    // 坐标处理    
    if (param === 'space_x' || param === 'space_y') {
      if (param === 'space_x') {
        item.config.x = props.data[param] * (index + 1)
      } else {
        item.config.y = props.data[param] * (index + 1) + 250
      }
    } else {
      item.config[param] = props.data[param]
    }
  });
}

function chooseColor(param: any) {
  props.data[param.attr] = param.value
  props.data.list.forEach((item: any) => {
    item.config[param.attr] = param.value
  });
}

function handleView(param: any){
  router.push(`/${param.uid}/${param.short_url_id}`)
}

function handleBind(param: any){
  store.dispatch('common/Fetch', {
    api: 'bindTrackMap',
    data: {
      coding: coding.art,
      type: 'talk',
      id: param.id,
      isBind: true
    }
  }).then(res => {
    props.render()
  })  
}

function hanleClick() {
  emit('imagesTU')
}

function submit(params: any) {
  const {
    id,
    name,
    font_size,
    font_color,
    space_x,
    space_y,
    line_width,
    line_color,
    type,
    description,
    visible,
    status
  } = props.data

  const param: any = {
    id,
    name: name,
    font_size: font_size || '12',
    font_color: font_color || '#333',
    space_x,
    space_y,
    line_width,
    line_color,
    type,
    description,
    visible,
    status
  }

  store.dispatch('common/Fetch', {
    api: 'Update',
    data: {
      coding: props.data.coding.art,
      ...param
    }
  }).then(res => {
    props.render()
  })
}
</script>
