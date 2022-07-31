<template>
  <div class="module-wrap">
    <div class="module-content basic-info"
         style="height: 485px;">

      <ul class="info info-passwd">
        <li><label>提示</label>这是您第一次设置07素材网密码，设置成功后，就可以直接用账号或ID登录07素材网了哦！</li>
        <!--密码必须是字母开头由数字字母下划线组成的长度为4-16的字符串-->
        <li class="mb15">
          <label><span style="color:#f00">*</span> 旧 &nbsp;密&nbsp;码</label>
          <input id="password"
                 type="password"
                 field="oldpassword"
                 value=""
                 placeholder="旧密码"
                 class="input-sm"
                 style=" width:280px;">
          <span id="passwordmsg"></span>
        </li>
        <li>
          <label><span style="color:#f00">*</span> 新&nbsp;密&nbsp;码</label>
          <input id="newpassword"
                 type="password"
                 field="password"
                 value=""
                 placeholder="新密码"
                 class="input-sm"
                 style=" width:280px;">
          <span id="newppasswordmsg"></span>
        </li>
        <li class="mb15"
            style="height: auto;line-height: 12px;">
          <div class="mr10 left">密码强度</div>
          <div class="left">
            <span class="bg-eee block left"
                  style=" margin-right:3px; width:50px; height:10px;"></span>
            <span class="bg-eee block left"
                  style=" margin-right:3px; width:50px; height:10px;"></span>
            <span class="bg-eee block left"
                  style="width:50px; height:10px;"></span>
          </div>
        </li>
        <li class="mb15">
          <label><span style="color:#f00">*</span> 确认密码</label>
          <input id="surepassword"
                 type="password"
                 field="surepassword"
                 value=""
                 placeholder="确认密码"
                 class="input-sm"
                 style=" width:280px;">
          <span id="sureppasswordmsg"></span>
        </li>
        <li class="mb15">
          <label><span style="color:#f00">*</span> 验&nbsp;证&nbsp;码</label>
          <input id="password"
                 type="password"
                 value=""
                 placeholder="验证码"
                 class="input-sm">
          <span class="pointer"
                style="background: #eee; padding: 0; position: absolute; left: 242px; height: 36px; line-height: 35px;"><img id="yzm"
                 src=""></span>
          <span id="passwordmsg"></span>
        </li>
        <li>
          <label></label>
          <input id="passwdbtn"
                 type="button"
                 value="保存修改"
                 class="btn btn-info">
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AsideView',
  
})
</script>
