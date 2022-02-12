<template>
  <div class="module-wrap m0">
    <div class="module-content basic-info"
         style="padding-bottom: 25px !important;">
      <div class="info-module">
        <span class="name">音乐设置</span>
        <div class="line"></div>
        <span class="update-info editbtn"
              @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </div>
      <ul class="info">
        <li>
          <label>背景音乐</label>
          <div class="con"
               v-if="isEdit">{{blog.music}}</div>
          <input type="text"
                 v-model="blogInfo.music"
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
  let isEdit = ref(true)
  const blogInfo: any = ref(props.blog)

  function Edit(){
    isEdit.value = !isEdit.value
    blogInfo.value = props.blog
    context.emit('update:blog', blogInfo.value)

    if(isEdit.value){
      const { music } = props.blog
      props.edit({
        music
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
