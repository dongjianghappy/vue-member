<template>
<div class="module-wrap m0">
  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <div class="info-module" :class="{'cancel-module': !isEdit}" >
      <span class="name">职业信息</span>
      <div class="line"></div>
       <v-space>
        <span v-show="!isEdit" class="update-info cancelbtn" @click="handelCancel">取消</span>
        <span  class="update-info editbtn" @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </v-space>
    </div>
    <ul class="info">
      <li>
        <label for="username">职业</label>
        <div class="con" v-if="isEdit">{{basicInfo.industry}}</div>
        <textarea v-model="userInfo.industry" class="" v-else></textarea>
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
          industry
        } = props.basicInfo
        props.edit({
          industry
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
