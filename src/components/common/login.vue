<template>
  <v-button v-model:show="isShow"
            v-if="displayButton">
    <span class="btn-login">{{title}}</span>
  </v-button>
  <v-dialog v-model:show="isShow"
            ref="form"
            title=""
            :hasfooter="false"
            :style="{width: 800, height: 450}"
            :contentStyle="{padding: 0, borderRadius: '4px', overflow: 'hidden', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)'}"
            :confirm="true"
            :cancel="true"
            @submit="submit">
    <template v-slot:content>
      <div class="login-wrap">
        <div class="login-left">
          <div class="font28">{{siteInfo.talk_site_name}}</div>
          <div class="title mtb20">一个记录与分享的个人博客...</div>
          <ul>
            <li><i class="iconfont icon-right1"></i>动态发布</li>
            <li><i class="iconfont icon-right1"></i>技术分享</li>
            <li><i class="iconfont icon-right1"></i>开发笔记</li>
            <li><i class="iconfont icon-right1"></i>在线问答</li>
            <li><i class="iconfont icon-right1"></i>博客收录</li>
          </ul>
        </div>
        <div class="login-box">
          <div class="popup-content align_center clearfix h455"
               style="padding: 50px !important">
            <div style="padding: 40px 15px; height: 335px">
              <div class="w150 h150 left">
                <div class="userLogin bg-eee w150 h150 bd-radius-50"
                     @click="handleClick('qq')"><i class="iconfont icon-qq"
                     style="font-size: 48px; color: #ff3766; line-height: 150px"></i>
                </div>
                <div class="font16 mt25"
                     @click="handleClick('qq')">QQ登录</div>
              </div>
              <div class="w150 h150 right">
                <div class="userLogin bg-eee w150 h150 font24 bd-radius-50 pointer"
                     @click="handleClick"
                     style="line-height: 145px; color: #ff3766"
                     data-url="http://www.yunxi10.com/login.html">
                  账号登录
                </div>
                <div class="font16 mt25"
                     @click="handleClick">账号登录</div>
              </div>
            </div>
            <div class="font12">
              登录即表示您同意并遵守
              <a href="/user-agreement.html "
                 target="_blank "
                 rel="nofollow">《用户协议》</a>
            </div>
          </div>
        </div>
      </div>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  watch,
  useRouter,
} from '@/utils'
import {
  useStore
} from 'vuex'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'HomeViewh',
  props: {
    title: {
      type: String,
      default: "登录"
    },
    displayButton: {
      type: Boolean,
      default: true
    },
    action: {
      type: String,
      default: "add"
    },
    group: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter()
    const siteInfo = computed(() => store.getters['user/siteInfo']);
    const isShow = ref(false)
    const detail: any = ref({
      id: "",
      name: "",
      url: ""
    })

    function handleClick(param: any) {
      if (param == 'qq') {
        window.location.href = 'http://www.yunxi10.com/api/login.php'
      } else {
        if (process.env.NODE_ENV === 'development') {
          router.push(`/login`)
        } else {
          window.location.href = 'http://www.yunxi10.com/login.html'
        }
      }

    }

    function submit(params: any) {
      const {
        id,
        name,
        description,
      } = detail.value

      const param: any = {
        name: name,
        description: description,
      }

      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action === 'add' ? "Insert" : 'Update',
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(res => {
        props.render()
        isShow.value = false
      })
    }

    onMounted(() => {
      if (!props.displayButton) {
        VueEvent.on("login", () => {
          isShow.value = true
        })
      }
    })

    return {
      isShow,
      detail,
      submit,
      handleClick,
      siteInfo
    }
  }
})
</script>

<style lang="less" scoped>
.login-wrap {
  display: flex;
  width: 800px;
  height: 450px;

  .login-left {
    background: var(--module-background);
    // background-image: linear-gradient(0deg, #ff5656, #ff9b70, #ff3766);
    padding: 50px;
    width: 300px;
    height: 450px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "微软雅黑", Tahoma, Arial, sans-serif;
    ul {
      li {
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
      }
    }
  }

  .login-box {
    background: var(--background);
    flex: 1
  }
}
</style>
