<template>
<v-button @click="handleclick">
  <div style="border: 2px dashed #ccc; height: 120px; line-height: 120px;" v-if="action === 'add'">
    <i class="iconfont icon-add"></i>
  </div>
  <i class="iconfont icon-edit" v-else />
</v-button>
<v-dialog v-model:show="isShow" :action="action" ref="dialog" title="自定义主题" width="950px" :style="{width: 650, height: 660}" :data="data" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="plr25">
      <ul class="form-wrap-box">
        <li class="li">
          <span class="label">主题名称</span>
          <input v-model="detail.name" type="text" placeholder="请输入主题名称" class="input-sm input-full" />
        </li>
        <li class="li">
          <span class="label">背景图{{detail.intelligent}}</span>
          <div class="flex">
            <div class="mt10" style="background: #33343f;">
              <div class="mr25" style="width: 245px">
                <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img" uploadtype="theme" @imgList="image" maxLength="1" :style="'width: 200px; height: 150px'" />
              </div>
              <div class="p10" style="flex: 1">
                <span class="block m5 relative left" :class="{current: item == transparentIndex }" style="width: 40px; height: 43px" :style="`background: url(${thumbnail}) no-repeat; background-size: cover; filter: brightness(${1-item})`" v-for="(item, index) in transparent" :key="index" @click="handleTransparent(item)">
                </span>
              </div>
            </div>
          </div>
          <div class="font12">点击以下色卡可自定义背景色</div>
          <div class="flex">
            <div class="mr10" style="width: 32px;">
              <input v-model="detail.background_color" type="color" class="p0" style="width: 35px; height: 32px;" />
            </div>
            <div style="flex: 1"><input v-model="detail.background_color" type="text" placeholder="请输入主题背景色" class="input-sm input-150" /></div>
            <div class="mr10" style="width: 70px;">背景图固定</div>
            <div style="width: 120px;">
              <v-radio label="是" name="isfixed" value="1" v-model:checked="detail.isfixed" />
              <v-radio label="否" name="isfixed" value="0" v-model:checked="detail.isfixed" />
            </div>
          </div>
        </li>
        <li class="li">
          <span class="label">模块背景</span>
          <div style="overflow: auto; margin-left: -5px;">
            <span class="block m5 left" style="width: 28px; height: 20px" :style="`background: ${item}`" v-for="(item, index) in color" :key="index" @click="()=>detail.module_background=item"></span>
          </div>
          <div class="font12">点击以下色卡可自定义主色调</div>
          <div class="flex">
            <div class="mr10" style="width: 32px;">
              <input v-model="detail.module_background" type="color" class="p0" style="width: 35px; height: 32px;" />
            </div>
            <div style="flex: 1"> <input v-model="detail.module_background" type="text" placeholder="请输入主题主色调" class="input-sm input-150" /></div>
            <div class="mr10" style="width: 60px;">智能主题</div>
            <div style="width: 120px;">
              <v-radio label="是" name="intelligent" value="1" v-model:checked="detail.intelligent" />
              <v-radio label="否" name="intelligent" value="0" v-model:checked="detail.intelligent" />
            </div>
          </div>
        </li>
        <li class="li">
          <span class="label">其他色调</span>
          <div class="col-md-6">
            <div class="font12">主色</div>
            <div class="flex">
              <div class="mr10" style="width: 32px;">
                <input v-model="detail.primary_color" type="color" class="p0" :disabled="detail.intelligent == '1'" style="width: 35px; height: 32px;" />
              </div>
              <input v-model="detail.primary_color" type="text" placeholder="请输入主题主色调" :disabled="detail.intelligent == '1'" class="input-sm input-150" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="font12">字体色</div>
            <div class="flex">
              <div class="mr10" style="width: 32px;">
                <input v-model="detail.font_color" type="color" class="p0" style="width: 35px; height: 32px;" />
              </div>
              <input v-model="detail.font_color" type="text" placeholder="请输入主题主色调" class="input-sm input-150" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  writeNewStyle
} from '@/utils'

const props: any = defineProps({
  action: {
    type: String,
    default: "add"
  },
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
})
const isShow: any = ref(false)
const store = useStore();
const dialog: any = ref(null)
const dataList: any = ref([])
const detail: any = ref({})
const img = ref("")
const thumbnail = ref("")
const transparentIndex: any = ref(1)
const transparent = ref([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
    transparentIndex.value = detail.value.background_transparent
    if (detail.value.image) {
      thumbnail.value = detail.value.img
    }
  }
})
// 监听路由
watch(() => detail, (newValues, prevValues) => {
  const {
    intelligent,
    img,
    background_transparent,
    background_color,
    primary_color,
    module_background,
    font_color,
    input_color
  } = detail.value

  writeNewStyle({
    intelligent,
    background_transparent,
    theme_background: `${background_color} url(${img[0].replace(/thumb/g, 'original')}) fixed no-repeat center 60px !important`,
    background_color,
    primary_color,
    module_background,
    font_color,
    input_color
  })
}, {
  deep: true
})

function init(param: any = "") {
  store.dispatch('common/Fetch', {
    api: 'getVote',
    data: {
      talk_id: props.data.id
    }
  }).then(res => {
    detail.value = res.result
    dataList.value = res.result.list
  })
}

// 监听图片上传
function image(a: any) {
  img.value = a
  thumbnail.value = (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1/uploadfile/temporary/theme/' : 'http://www.dongblog.com/uploadfile/temporary/theme/') + a.slice(1, -1)
  const {
    background_transparent,
    background_color,
    primary_color,
    module_background,
    font_color,
    input_color
  } = detail.value

  writeNewStyle({
    background_transparent,
    theme_background: `${background_color} url(${thumbnail.value.replace(/thumb/g, 'original')}) fixed no-repeat center 60px !important`,
    background_color,
    primary_color,
    module_background,
    font_color,
    input_color
  })
}

function handleclick(param: any) {
  isShow.value = !isShow.value
}

function handleTransparent(param: any) {
  transparentIndex.value = param
  detail.value.background_transparent = param
}

// 确认按钮
function submit(params: any) {
  const {
    id,
    fid,
    name,
    background_color,
    module_background,
    primary_color,
    font_color,
    input_color,
    isfixed,
    intelligent,
    grade,
    description,
    status
  } = detail.value

  const param: any = {
    name,
    fid,
    background_transparent: transparentIndex.value,
    background_color,
    module_background,
    primary_color,
    font_color,
    input_color,
    isfixed,
    intelligent,
    grade,
    img: img.value,
    description,
    status,
    custom: '1',
    coding: props.data.coding
  }
  if (props.action === 'edit') {
    param.id = id
  }

  store.dispatch('common/Fetch', {
    api: props.action !== 'add' ? 'Update' : 'Insert',
    data: {
      ...param,
    }
  }).then(() => {
    isShow.value = false
    props.render()
  })
}
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 4px;
  /* 设置滚动条的宽度 */
  background-color: #222;
  /* 设置滚动条的背景颜色 */
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  /* 设置滚动条滑块的圆角 */
  background-color: #45494e;
  /* 设置滚动条滑块的颜色 */
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  /* 为滚动条轨道添加阴影效果 */
}

.form-wrap-box {
  overflow: hidden;

  .li {
    box-sizing: initial;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
}

.current {
  border: 3px solid #fff;
}
</style>
