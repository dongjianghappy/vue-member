<template>
<div>
  <section style="position:fixed; top:0; left:0; right:0; bottom:0;">
    <div id="detail" class="login-con box-shadow clearfix" style="left: 50%; top: 50%; margin-left: -300px; margin-top: -150px;">
      <div id="userinfo" class="login-left left">
        <div class="photos"><i class="iconfont icon-user" style="font-size:64px !important;"></i></div>
        <div id="name" class="username"></div>
      </div>
      <div id="content" class="login-right right">
        <h1>IT技术分享互动社区</h1>
        <ul>
          <li><i class="iconfont icon-magnifier"></i><input id="username" v-model="username" type="text" placeholder="用户名/账号/邮箱" class="input-sm"></li>
          <li><i class="iconfont icon-dot-more"></i><input id="password" v-model="password" type="password" placeholder="密码" class="input-sm"></li>
          <li>
            <v-button @onClick="login">登录</v-button>
          </li>
          <li class="cl-red">{{msg}}</li>
        </ul>

        <div style="position:absolute; bottom: 15px;"><a href="/api/login.php" class="cl-5bc0de" target="_blank"><i class="iconfont icon-qq font16 cl-5bc0de"></i> QQ登录</a></div>
      </div>
    </div>
  </section>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
import {
  useRouter
} from 'vue-router'

export default defineComponent({
  name: 'HomeViewbbb',
  data() {
    return {
      username: '',
      password: '',
    };
  },

  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const msg: any = ref("")

    function login() {

      const {
        username,
        password
      } = ctx
      store.dispatch('user/Login', {
        username,
        password
      }).then((res) => {
        if (res.ifSuccess === 1) {
          if (res.result.userInfo.weibo != '1') {
            router.push(`/open`)
          }
          else if (res.result.config.talk === undefined) {
            router.push(`/site`)
          } else {
            sessionStorage.setItem("userInfo", JSON.stringify(res.result.userInfo))
            document.cookie = `token=${res.result.token};path=/`
            router.push(`/u/${res.result.userInfo.account}`)
            sessionStorage.setItem("loginMessage", 'true')
          }
        }else{
          msg.value = res.returnMessage
        }
      });

    }
    return {
      login,
      msg
    }
  }
})
</script>
