<template>
  <div class="module-wrap m0">
    <div class="module-content basic-info">
      <div class="info-module">
        <span class="name">联系信息</span>
        <div class="line"></div>
        <span class="update-info editbtn"
              @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </div>
      <ul class="info">
        <li>
          <label>邮箱</label>
          <div class="con"
               v-if="isEdit">{{user.email}}</div>
          <input type="text"
                 v-model="userInfo.email"
                 class="input-sm"
                 v-else>
        </li>
        <li>
          <label>电话</label>
          <div class="con"
               v-if="isEdit">{{user.phone}}</div>
          <input type="text"
                 v-model="userInfo.phone"
                 class="input-sm"
                 v-else>
        </li>
        <li>
          <label>QQ</label>
          <div class="con"
               v-if="isEdit">{{user.qq}}</div>
          <input type="text"
                 v-model="userInfo.qq"
                 class="input-sm"
                 v-else>
        </li>
        <li>
          <label>微信</label>
          <div class="con"
               v-if="isEdit">{{user.weixin}}</div>
          <input type="text"
                 v-model="userInfo.weixin"
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
    user: {
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
emits: ['update:user'],
setup(props,context) {
  const {ctx}:any = getCurrentInstance();
  let isEdit = ref(true)
  const userInfo: any = ref(props.user)

  function Edit(){
    isEdit.value = !isEdit.value
    userInfo.value = props.user
    context.emit('update:user', userInfo.value)

    if(isEdit.value){
      const { email, phone, qq, weixin } = props.user
      props.edit({
        email,
        phone,
        qq,
        weixin 
      })
    }
  }

  return {
    isEdit,
    Edit,
    userInfo
  }
}   
})
</script>
