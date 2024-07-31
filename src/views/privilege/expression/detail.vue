<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-edit" v-if="action === 'edit'" />
  <img :src="data.image" style="width: 150px;" v-else />
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="" action="edit" :style="{width: 350, height: 450}" :hasfooter="false">
  <template v-slot:content>
    <div class="align_center" style="height:400px">
      <img :src="data.image" style="width: 250px;" />
    </div>
    <div v-if="action === 'edit'"><input type="text" v-model="data.name" class="input-sm w-full" placeholder="请输入名称"></div>
    <div class="align_center" style="height: 50px; line-height: 50px;">
      <div @click="handleSubmit('expression')" v-if="action === 'edit'">保存</div>
      <div @click="handleSave('expression')" v-else>添加至表情</div>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  codings,
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
    default: 'add'
  },
  render: {
    type: Function,
    default: () => {
      return
    }
  },
})
const store = useStore();
const coding = codings.user
const isShow = ref(false)
const dialog: any = ref(null)
const detail: any = ref({})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
  }
})

function handleSave(params: any) {

  let img = props.data.image.split("/")

  const param: any = {
    img: `|${img[img.length - 1]}|`
  }

  store.dispatch('common/Fetch', {
    api: 'insertExpression',
    data: {
      ...param,
    }
  }).then(() => {
    isShow.value = false

  })
}

function handleSubmit() {
  store.dispatch('common/Fetch', {
    api: 'Update',
    data: {
      coding: coding.expression,
      id: props.data.id,
      name: props.data.name
    }
  }).then(() => {
    isShow.value = false
    props.render()
  })
}
</script>
