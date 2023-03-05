<template>
<v-button v-model:show="isShow">
  预检
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="机器人检测" width="650px" height="550px" :hasfooter="false">
  <template v-slot:content>
    <div class="layer-content p5" style="height: 405px;">
      <perfect-scrollbar>
        <div>
          <template v-for="(item, index) in dataList" :key="index">
            <!-- 机器人人 -->
            <div class="con-list" v-if="item.type !== '0'">
              <div class="con-wrap">
                <div class="photos"><i class="iconfont icon-robot font24"></i></div>

                <div class="user_text">
                  <div style="min-height: 30px;">{{item.speech}}
                    <Broadcast :speech="item.speech" />
                  </div>
                </div>
              </div>
            </div>
            <!-- 用户 -->
            <div class="con-list" v-else>
              <div class="user-chat-wrap">
                <div class="photos"><i class="iconfont icon-user font24"></i></div>

                <div class="user_text">
                  <div style="min-height: 30px;"><Broadcast :speech="item.speech" />{{item.speech}}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </perfect-scrollbar>
    </div>

    <div class="form-wrap">
      <div class="input-box p10">
        <input type="text" v-model="content" placeholder="说点什么好" ref="Input" @ended="save">
      </div>
      <div class="operate" style="height: 15px">
        <button @click="save" class="operate-right absolute" :class="{disabled: !content}" :disabled="!content" style="top: -27px;
    right: 13px;">保存</button>
      </div>
    </div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch
} from 'vue'
import {
  useStore
} from 'vuex'
import Broadcast from './broadcast.vue'
export default defineComponent({
  name: 'v-Mood',
  components: {
    Broadcast
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props, context) {
    const store = useStore();
    const isShow = ref(false)
    const issave = ref(false)
    const dataList: any = ref([])
    const content: any = ref("")
    const current: any = ref()

    // 监听弹窗变量
    watch([isShow], (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = []
        init()
      }
    })

    //初始页面
    function init() {
      store.dispatch('common/Fetch', {
        api: "begin",
        data: {
          id: props.data.id
        }
      }).then(res => {
        dataList.value.push(res.result.speech[0])

      })
    }

    function handelclick(param: any) {
      current.value = param.id
      issave.value = true
    }

    function save() {
      dataList.value.push({
        speech: content.value,
        type: '0'
      })
      store.dispatch('common/Fetch', {
        api: "talking",
        data: {
          id: props.data.id,
          content: content.value
        }
      }).then(res => {
        res.result.speech.forEach((item: any) => {
          dataList.value.push(item)
        });
        

      })
    }

    return {
      isShow,
      dataList,
      handelclick,
      content,
      issave,
      current,
      save
    }
  }
})
</script>

<style lang="less" scoped>
.li {
  background: #ccc;
  height: 75px;
  border-radius: 5px;
  line-height: 75px;
  color: #fff;
}

.current {
  background: #8bc34a;
}

.ps {
  height: 320px;
}

.con-list {
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  height: auto;
  border-radius: 2px;

  .con-wrap {
    position: relative;
    padding: 15px 15px 15px 80px;

    .photos {
      background: #eee;
      position: absolute;
      top: 15px;
      left: 15px;
      border-radius: 30px;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;

      a {
        display: block;
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

    .user_info {
      .username {
        font-weight: bold;
      }
    }

    .user_from {
      font-size: 10px;
      color: #808080;
    }

    .user_text {
      background: #eee;
      display: inline-block;
      border-radius: 8px;
      padding: 10px;
      max-width: 50%;
      line-height: 23px;

      .topic {
        color: #eb7350;
      }
    }
  }

  .user-chat-wrap {
    position: relative;
    padding: 15px 80px 15px 15px;
    text-align: right;

    .photos {
      background: #eee;
      position: absolute;
      top: 15px;
      right: 15px;
      border-radius: 30px;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;

      a {
        display: block;
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

    .user_info {
      .username {
        font-weight: bold;
      }
    }

    .user_from {
      font-size: 10px;
      color: #808080;
    }

    .user_text {
      background: #ffc09f;
      color: #fff;
      border-radius: 8px;
      padding: 10px;
      max-width: 50%;
      line-height: 23px;
      float: right;

      .topic {
        color: #eb7350;
      }
    }
  }

}
</style>
