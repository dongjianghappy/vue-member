<template>
  <div class="module-wrap">
    <div class="module-content basic-info"
         style="height: 485px;">
      <h3 class="mb10">会员账号激活</h3>
      <!--激活-->
      <p class="salutation mb10">亲爱的 <span id="username"
              style="color:#0CC">东江哥</span>，您好!：</p>
      <p id="con"
         class="mb10">您的账号<span class="h3">尚未激活</span>，请点击以下按钮发送邮件到你的<span id="useremail"
              class="h3">125772116@qq.com</span>邮箱进行激活，点击链接 <a href="http://100tupian.com/"
           target="_blank">http://100tupian.com</a> 返回(提示：激活链接需在4个小时以内进去激活，过期失效)<br><br>
      </p>
      <p>
        <button id="sendemailactivation"
                type="button"
                class="btn btn-info"
                @click="handleclick">更换头像</button>
        <span id="email-info"></span>
      </p>
    </div>
    <Index v-model:showFlag="isShow"
           v-if="isShow" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import Index from './components/index.vue'

export default defineComponent({
  name: 'AsideView',
components: {
   Index
  },  
    setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const isShow: any = ref(false)

    function handleclick(){
      isShow.value = true
    }
    return {
      handleclick,
      isShow
    }
  }
})
</script>
