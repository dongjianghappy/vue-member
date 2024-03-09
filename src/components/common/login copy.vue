<template>
<v-button v-model:show="isShow">
  <span class="btn-login">{{title}}</span>
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="" :style="{width: 800, height: 450}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <div id="detail" class="login-con layer-login box-shadow">
      <div id="userinfo" class="login-left left" style="background: var(--module-background);">
        <h3>东江博客</h3>
        <div class="title">点滴生活，从这里开始！</div>
        <ul>
          <li><i class="iconfont icon-right1"></i>素材下载</li>
          <li><i class="iconfont icon-right1"></i>技术分享</li>
          <li><i class="iconfont icon-right1"></i>开发笔记</li>
          <li><i class="iconfont icon-right1"></i>在线问答</li>
          <li><i class="iconfont icon-right1"></i>博客收录</li>
        </ul>
      </div>
      <div id="content" class="login-right right">
        <div class="popup-content align_center clearfix h455" style="padding: 50px 30px !important">
          <div style="padding: 40px 15px; height: 335px">
            <div class="w150 h150 left">
              <div class="userLogin bg-eee w150 h150 bd-radius-50" @click="handleClick('qq')" ><i class="iconfont icon-qq cl-5bc0de" style="font-size: 48px; line-height: 150px"></i>
              </div>
              <div class="font16 mt25" @click="handleClick('qq')">QQ登录</div>
            </div>
            <div class="w150 h150 right">
              <div class="userLogin bg-eee w150 h150 font24 cl-5bc0de bd-radius-50 pointer" @click="handleClick" style="line-height: 145px" data-url="http://www.yunxi10.com/login.html">
                账号登录
              </div>
              <div class="font16 mt25" @click="handleClick">账号登录</div>
            </div>
          </div>
          <div class="font12">
            登录即表示您同意并遵守
            <a href="/user-agreement.html " target="_blank " rel="nofollow">《用户协议》</a>
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
  watch,
  useRouter,
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewh',
  props: {
    title: {
      type: String,
      default: "登录"
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
    const isShow = ref(false)
    const detail: any = ref({
      id: "",
      name: "",
      url: ""
    })

    // // 监听
    // watch([isShow], async (newValues, prevValues) => {
    //   if (isShow.value) {

    //   }
    // })

    function handleClick(param: any) {
      if(param == 'qq'){
        window.location.href = 'http://www.yunxi10.com/api/login.php'
      }else{
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

    return {
      isShow,
      detail,
      submit,
      handleClick
    }
  }
})
</script>
