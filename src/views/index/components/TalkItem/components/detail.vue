<template>
<v-button v-model:show="isShow">
  编辑
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" title="编辑微博" action="edit" :data="data" :style="{width: 750, height: 650}" @submit="submit">
  <template v-slot:content>
    <div class="form-wrap-box">
      <div class="li">
        <span class="label">话题</span>
        <input v-model="detail.title" type="text" class="input-sm input-full" />
      </div>
      <div class="li">
        <span class="label">图片</span>
        <textarea v-model="detail.image" style="height: 100px" placeholder="请输入图片文件名" class="w-full"></textarea>
      </div>
      <div class="li">
        <span class="label">微博内容</span>
        <textarea v-model="detail.summary" style="height: 300px" placeholder="请输入微博内容" class="w-full"></textarea>
      </div>
    </div>
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
    default: "edit"
  }
})
const store = useStore();
const isShow = ref(false)
const dialog: any = ref(null)
const detail: any = ref({})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
  }
})

function submit(params: any) {
  const {
    id,
    title,
    image,
    summary
  } = detail.value

  const param: any = {
    id,
    title,
    image,
    summary,
    coding: props.data.coding
  }

  if(props.action !== 'edit'){
    param.operation = "commit"
  }

  store.dispatch('common/Fetch', {
    api: 'updateTalk',
    data: {
      ...param,
    }
  }).then(() => {
    isShow.value = false
    props.data.image = image
    props.data.summary = summary
  })
}
</script>
