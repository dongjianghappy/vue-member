<template>
<div class="module-wrap m0">
  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <div class="info-module" :class="{'cancel-module': !isEdit}">
      <span class="name">博客信息</span>
      <div class="line"></div>
      <v-space>
        <span v-show="!isEdit" class="update-info cancelbtn" @click="handelCancel">取消</span>
        <span class="update-info editbtn" @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </v-space>
    </div>
    <ul class="info">
      <li>
        <label>标签</label>
        <div class="con" v-if="isEdit">{{basicInfo.blog_tag}}</div>
        <textarea v-model="userInfo.blog_tag" class="" v-else></textarea>
      </li>
      <li>
        <label>描述</label>
        <div class="con" v-if="isEdit">{{basicInfo.blog_desc}}</div>
        <textarea v-model="userInfo.blog_desc" class="" v-else></textarea>
      </li>
    </ul>
  </div>

</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  computed
} from 'vue'

export default defineComponent({
  name: 'AsideView',
  props: {
    basicInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    edit: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  emits: ['update:basicInfo'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    let isEdit = ref(true)
    const userInfo: any = ref(props.basicInfo)

    function Edit() {
      isEdit.value = !isEdit.value
      userInfo.value = props.basicInfo
      context.emit('update:basicInfo', userInfo.value)

      if (isEdit.value) {
        const {
          blog_tag,
          blog_desc
        } = props.basicInfo
        props.edit({
          blog_tag,
          blog_desc
        })
      }
    }

    // 取消
    function handelCancel() {
      isEdit.value = !isEdit.value
    }      

    return {
      isEdit,
      Edit,
      handelCancel,
      userInfo
    }
  }
})
</script>
