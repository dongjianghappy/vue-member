<template>
<span @click="handleclick">
  <slot></slot>
</span>
<v-dialog v-model:show="isShow" ref="form" title="" :style="{width: '1200', height: '650'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="[{name: '话题',value: 'talk'},{name: '相册',value: 'photos'},{name: '图库',value: 'picture'}]" :isEmit="true" v-model:index="index">
      <template v-slot:content1>
        <List kind="talk" v-model:currentImg="currentImg" />

      </template>
      <template v-slot:content2>
        <List kind="photos" v-model:currentImg="currentImg" />

      </template>
      <template v-slot:content3>
        <List kind="picture" v-model:currentImg="currentImg" />
      </template>
    </v-tabs>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore,
} from '@/utils'

import List from './components/list.vue'
export default defineComponent({
  name: 'v-Spaces',
  components: {

    List
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['selectImage', 'update:image'],
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const filename: any = ref("")
    const currentImg: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function submit() {
      let image = currentImg.value.replace('thumb', 'view')
      const data = {
        type: 'image',
        value: `![Description](${image})`
      }
      context.emit('selectImage', data)
      isShow.value = !isShow.value

    }

    return {
      isShow,
      handleclick,
      filename,
      detail,
      drawer,
      submit,
      currentImg
    }
  }
})
</script>
