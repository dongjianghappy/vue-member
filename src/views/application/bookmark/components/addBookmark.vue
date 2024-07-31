<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? '': '添加书签'}}
</v-button>
<v-dialog v-model:show="isShow" ref="form" :title="action === 'add' ? '添加书签' : '编辑书签'" :style="{width: 550, height: 450}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <ul class="edit-list">
      <li class="mb15">
        <div class="mb5">书签名称</div>
        <input type="text" v-model="detail.name" class="input-sm input-full">
      </li>
      <li class="mb15">
        <div class="mb5">书签分类</div>
        <v-select :enums="group" v-model:value="detail.fid" :defaultValue="detail.fid = detail.fid ? detail.fid : '5'" />
      </li>
      <li>
        <div class="mb5">书签地址</div>
        <textarea v-model="detail.url" placeholder="请输入分组描述" class="w-full"></textarea>
      </li>
    </ul>
    <div class="mt15">
      <v-visible v-model:visible="detail.visible" />
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
  action: {
    type: String,
    default: "add"
  },
  group: {
    type: Object,
    default: () => {
      return {}
    }
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
      return 'Default function'
    }
  }
})
const store = useStore();
const isShow = ref(false)
const detail: any = ref({
  id: "",
  name: "",
  url: ""
})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = props.data
  }
})

function submit(params: any) {
  const {
    id,
    fid,
    name,
    url,
    visible,
  } = detail.value

  const param: any = {
    fid,
    name,
    url,
    visible,
  }

  if (props.action === 'edit') {
    param.id = id
  }

  store.dispatch('common/Fetch', {
    api: props.action === 'add' ? "Insert" : 'Update',
    data: {
      coding: props.data.coding.art,
      fid: props.data.fid,
      ...param
    }
  }).then(res => {
    props.render()
    isShow.value = false
  })
}
</script>
