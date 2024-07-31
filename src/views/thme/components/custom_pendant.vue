<template>
<v-button @click="handleclick">
  <div style="border: 2px dashed #ccc; height: 120px; line-height: 120px;" v-if="action === 'add'">
    <i class="iconfont icon-add"></i>
  </div>
  <i class="iconfont icon-edit" v-else />
</v-button>
<v-dialog v-model:show="isShow" :action="action" ref="dialog" title="自定义挂件" :style="{width: 650, height: 480}" :data="data" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="plr25">
      <ul class="form-wrap-box">
        <li class="li">
          <span class="label">挂件名称</span>
          <input v-model="detail.name" type="text" placeholder="请输入挂件名称" class="input-sm input-full" />
        </li>
        <li class="li">
          <span class="label">Style属性</span>
          <div><textarea v-model="detail.style" placeholder="请输入Style属性" class="w-full"></textarea></div>
        </li>
        <li class="li">
          <span class="label">预览图</span>
        <div style="overflow: hidden;">
          <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img" uploadtype="theme" @imgList="image" :style="'width: 135px'" />
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

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
  }
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
}

function handleclick(param: any) {
  isShow.value = !isShow.value
}

// 确认按钮
function submit(params: any) {
  const {
    id,
    name,
    style,
  } = detail.value

  const param: any = {
    name,
    style,
    img: img.value,
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

.current {
  border: 3px solid #fff;
}
</style>
