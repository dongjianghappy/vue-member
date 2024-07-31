<template>
<div class="letter-wrap">
  <div class="letter-left">
    <div id="letter-user" class="letter-content p0">
      <v-collapse :title="`${item.name}(${item.num || 0})`" :iscollapse="true" v-for="(item, index) in userGroup" :key="index" @onClick="GroupUser(item.id, item)">
        <template v-if="item.list && item.list.length > 0">
          <div v-for="(list, i) in item.list" :key="i" style="height: 50px; line-height: 50px;" @click="handleUser(list)" :class="{current: currentUser.account === list.account}">
            <v-avatar :data="item" />
            {{list.nickname}}
          </div>
        </template>
      </v-collapse>
    </div>
    <div class="letter-form"></div>
  </div>
  <div class="letter-right">
    <div id="letter-content" class="letter-content">
      <div className="reply">
        <template v-for="(item, index) in chatData" :key="index">
          <div v-if="loginuser.account != item.uid">
            <div class="chat-content">
              <div className="avator-box">
                <v-avatar :data="item" />
              </div>
              <div class="chat-wrap chat-left">
                <div class="arrow arrow-left"></div>
                <div class="chat-1">{{item.content}}</div>
              </div>
            </div>

            <!-- <div className="content"></div> -->

          </div>
          <div v-else>
            <div class="chat-content align_right">
              <div class="chat-wrap chat-right">
                <div class="chat-1">{{item.content}}</div>
                <div class="arrow arrow-right"></div>
              </div>
              <div className="avator-box">
                <v-avatar :data="item" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="letter-form">
      <div class="send-input-box relative">
        <textarea v-model="content" placeholder="有什么新鲜事想分享给大家？" class="talkcontent-wrap" style="background: transparent; resize: none;"></textarea>
        <button @click.enter="handleChat" class="btn absolute bg-white" style="right: 15px; bottom: 10px;">发送(S)</button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import VueEvent from '@/utils/event'
import {websocket} from './websocket'
import {
  defineComponent,
  useStore,
  getUid,
  ref,
  onMounted,
  computed
} from '@/utils'

export default defineComponent({
  name: 'v-Button',
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    buttonType: {
      type: String,
      default: "text"
    },
    show: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:show', 'onClick'],
  setup(props, context) {
    const store = useStore();
    const userGroup: any = ref([])
    const content: any = ref("")
    const chatData: any = ref([])
    const currentUser: any = ref({})
    const loginuser = computed(() => store.getters['user/loginuser']);

    // 按钮消息发送两种方式: 1、点击事件监听，2、点击响应式切换
    function handleClick() {
      context.emit('onClick')
      context.emit('update:show', !props.show)
    }

    function Grouping() {
      store.dispatch('common/Fetch', {
        api: "userGroup",
        data: {
          coding: "U0700006",
          uid: getUid()
        }
      }).then(res => {
        userGroup.value = res.result
      })
    }

    function GroupUser(id: any, item: any) {
      store.dispatch('common/Fetch', {
        api: "userGroupList",
        data: {
          coding: "U0700006",
          id: id,
          uid: getUid()
        }
      }).then(res => {
        item.list = res.result
      })
    }

    function chatList() {
      if(!currentUser.value.account){
        return
      }
      store.dispatch('common/Fetch', {
        api: "chatList",
        data: {
          uid: currentUser.value.account
        }
      }).then(res => {
        chatData.value = res.result

      })
    }

    function handleUser(param: any){
      currentUser.value = param
      websocket({uid: loginuser.value.account, name: loginuser.value.nickname, photos: loginuser.value.photos, friend_uid: currentUser.value.account,})
      chatList()
    }

    function handleChat() {
      VueEvent.emit("chat", {
        content: content.value,
        uid: currentUser.value.account,
        name: currentUser.value.nickname,
        photos: currentUser.value.photos
      });
      // store.dispatch('common/Fetch', {
      //   api: "chat",
      //   data: {
      //     content: content.value,
      //     uid: currentUser.value.account
      //   }
      // }).then(res => {
      //   chatList()
      // })
    }

    onMounted(() => {
      Grouping()
      chatList()
      VueEvent.on("content", (data: any) => {
        if(data.type != 'join'){
          chatData.value.push({
            uid: data.uid,
            name: data.name,
            photos: data.photos,
            content: data.content
          })
        }
      });
    })
    return {
      currentUser,
      content,
      handleClick,
      userGroup,
      GroupUser,
      handleChat,
      chatData,
      handleUser,
      loginuser
    }
  }
})
</script>

<style lang="less" scoped>
.reply {
  min-height: 250px;

  ul {
    padding: 0;

    li {
      position: relative;
      padding: 10px 0;
    }
  }

  .user-info {
    padding-bottom: 5px;
    padding-left: 30px;

    .photos {
      position: absolute;
      left: 0;
    }
  }

  .manager-info {
    padding-bottom: 5px;
    padding-right: 30px;

    .photos {
      position: absolute;
      right: 0;
    }
  }

  .reply-list {
    text-align: right;
  }

  .content {
    padding: 0 30px;
  }
}
.current{
  background: var(--color-primary-2);
  color: #333;
}
</style>
