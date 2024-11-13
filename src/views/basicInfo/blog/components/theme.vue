<template>
  <div class="module-wrap m0">
    <div class="module-content basic-info">
      <div class="info-module">
        <span class="name">风格设置</span>
        <div class="line"></div>
        <span class="update-info editbtn"
              @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </div>
      <ul class="info">
        <li>
          <label>头像背景</label>
          <div class="con"
               v-if="isEdit">{{blog.head_bg}}</div>
          <input type="text"
                 v-model="blogInfo.head_bg"
                 class="input-sm"
                 v-else>
        </li>
        <li>
          <label>内容背景</label>
          <div class="con"
               v-if="isEdit">{{blog.main_bg}}</div>
          <input type="text"
                 v-model="blogInfo.main_bg"
                 class="input-sm"
                 v-else>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, computed } from 'vue'

export default defineComponent({
  name: 'AsideView',
  props: {
    blog: {
      type: Object,
      default: () => {return {}}
    },
    edit: {
      type: Function,
      default: () => {
        return 
      }
    }
  },
emits: ['update:blog'],
setup(props,context) {
  const {ctx}:any = getCurrentInstance();
  let isEdit: any = ref(true)
  const blogInfo: any = ref(props.blog)

  function Edit(){
    isEdit.value = !isEdit.value
    blogInfo.value = props.blog
    context.emit('update:blog', blogInfo.value)

    if(isEdit.value){
      const { head_bg, main_bg } = props.blog
      props.edit({
        head_bg,
        main_bg
      })
    }
  }

  return {
    isEdit,
    Edit,
    blogInfo
  }
}   
})
</script>
