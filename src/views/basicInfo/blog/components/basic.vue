<template>
  <div class="module-wrap m0">
    <div class="module-content basic-info">
      <div class="info-module">
        <span class="name">博客信息</span>
        <div class="line"></div>
        <span data-coding=""
              class="update-info editbtn"
              @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </div>
      <ul class="info">
        <li>
          <label>昵称</label>
          <div class="con"
               v-if="isEdit">{{blog.nickname}}</div>
          <input type="text"
                 v-model="blogInfo.nickname"
                 class="input-sm"
                 v-else>
        </li>
        <li>
          <label>标签</label>
          <div class="con"
               v-if="isEdit">{{blog.tag}}</div>
          <input type="text"
                 v-model="blogInfo.tag"
                 class="input-sm"
                 v-else>
        </li>
        <li style="min-height: 95px"><label>描述</label>
          <div class="con"
               v-if="isEdit">{{blog.description}}</div>
          <textarea v-model="blogInfo.description"
                    v-else></textarea>
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
      const { nickname, tag, description } = props.blog
      props.edit({
        nickname,
        tag,
        description
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
