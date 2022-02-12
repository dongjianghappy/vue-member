<template>
  <div class="module-wrap">
    <div class="module-content basic-info"
         style="height: 485px;">

      <ul class="info info-passwd">
        <!-- <li><label>提示</label>这是您第一次设置07素材网密码，设置成功后，就可以直接用账号或ID登录07素材网了哦！</li> -->
        <!--密码必须是字母开头由数字字母下划线组成的长度为4-16的字符串-->
        <li class="mb15">
          <label><span style="color:#f00">*</span> 旧 &nbsp;密&nbsp;码</label>
          <input type="password"
                 v-model="data.oldpassword"
                 placeholder="旧密码"
                 class="input-sm"
                 style=" width:280px;">
        </li>
        <li class="mb15"
            style="height: auto;line-height: 12px;">
          <div class="mr10 left">密码强度</div>
          <div class="left">
            <em style=" margin-right:3px; width:50px; height:10px;"></em>
            <em style=" margin-right:3px; width:50px; height:10px;"></em>
            <em style="width:50px; height:10px;"></em>
          </div>
        </li>
        <li>
          <label><span style="color:#f00">*</span> 新&nbsp;密&nbsp;码</label>
          <input id="newpassword"
                 type="password"
                 v-model="data.password"
                 placeholder="新密码"
                 class="input-sm"
                 style=" width:280px;">
        </li>
        <li class="mb15"
            style="height: auto;line-height: 12px;">
          <div class="mr10 left">密码强度</div>
          <div class="left">
            <em style=" margin-right:3px; width:50px; height:10px;"></em>
            <em style=" margin-right:3px; width:50px; height:10px;"></em>
            <em style="width:50px; height:10px;"></em>
          </div>
        </li>
        <li class="mb15">
          <label><span style="color:#f00">*</span> 确认密码</label>
          <input type="password"
                 v-model="data.surepassword"
                 placeholder="确认密码"
                 class="input-sm"
                 style=" width:280px;">
        </li>
        <li class="mb15"
            style="height: auto;line-height: 12px;">
          <div class="mr10 left">密码强度</div>
          <div class="left">
            <em style=" margin-right:3px; width:50px; height:10px;"></em>
            <em style=" margin-right:3px; width:50px; height:10px;"></em>
            <em style="width:50px; height:10px;"></em>
          </div>
        </li>
        <li class="mb15">
          <label><span style="color:#f00">*</span> 验&nbsp;证&nbsp;码</label>
          <input placeholder="验证码"
                 type="text"
                 class="input-sm">
          <span class="pointer"
                style="background: #eee; padding: 0; position: absolute; left: 242px; height: 36px; line-height: 35px;"><img id="yzm"
                 src=""></span>
        </li>
        <li>
          <label></label>
          <input type="button"
                 value="保存修改"
                 class="btn btn-info"
                 @click="handleclick">
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import { sha256 } from 'js-sha256'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore();

      const data: any = ref({
        oldpassword: "",
        password: "",
        surepassword: ""
      })


      function init(){

      let li: any = document.querySelectorAll('input[type=password]');

        for(let i = 0; i < li.length; i++){
          
          li[i].onkeyup = onkeyup
        }


        function onkeyup(e: any){

          let spans: any = e.currentTarget.parentNode.nextSibling.childNodes[1].children
          //强度状态设为默认
          spans[0].className = spans[1].className = spans[2].className = "default";
          let pwd = e.currentTarget.value;
          let result = 0;
          for(let i = 0, len = pwd.length; i < len; ++i){
            result |= charType(pwd.charCodeAt(i));
          }
          let level = 0;
          //对result进行四次循环，计算其level
          for(let i = 0; i <= 4; i++){
            if(result & 1){
              level ++;
            }
            //右移一位
            result = result >>> 1;
          }
          if(pwd.length >= 6){
            switch (level) {
              case 1:
                spans[0].className = "weak";
                break;
              case 2:
                spans[0].className = "medium";
                spans[1].className = "medium";
                break;
              case 3:
              case 4:
                spans[0].className = "strong";
                spans[1].className = "strong";
                spans[2].className = "strong";
                break;
            }
          }
        }
      }

      
    /*
      定义一个函数，对给定的数分为四类(判断密码类型)，返回十进制1，2，4，8
      数字 0001 -->1 48~57
      小写字母 0010 -->2 97~122
      大写字母 0100 -->4 65~90
      特殊 1000 --> 8 其它
    */
    function charType(num: any){
      if(num >= 48 && num <= 57){
        return 1;
      }
      if (num >= 97 && num <= 122) {
        return 2;
      }
      if (num >= 65 && num <= 90) {
        return 4;
      }
      return 8;
    }


    function handleclick(){
      // if(data.value.surepassword !== data.value.password){
      //   proxy.$hlj.message({
      //     msg: "新密码与确认密码不一致"
      //   })
      //   return
      // }
      const { password, oldpassword, surepassword } = data.value
      store.dispatch('common/Fetch', {
          api: "EditUserPassword",
          data: {
            oldpassword, // sha256(oldpassword),
            password, // sha256(password),
            surepassword, // sha256(surepassword)
          }
      }).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
        console.log("ss");
      })
      
    }
    onMounted(init)
    return {
      handleclick,
      data
    }
  }  
  
})
</script>

<style scoped>
.default {background: #eeeeee;}
.weak {background: #FF0000;}
.medium {background: #FF9900;}
.strong {background: #33CC00;}
em {background: #eee; float: left !important; display: block;}
</style>
