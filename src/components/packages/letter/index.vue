<template>
<v-button v-model:show="isShow">
  {{data.name}}
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="" :close="false" :style="{width: '850', height: '600'}" :contentStyle="{padding: 0}" :hasfooter="false">
  <template v-slot:content>
    <Frame :tabs="tabs" :isEmit="true" v-model:index="index">

      <template v-slot:extra>
        <span @click="hadnleClose">关闭</span>
      </template>
      <template v-slot:content1>
        <Contacts />
      </template>
      <template v-slot:content2>
        <Group />
      </template>
      <template v-slot:content3>

      </template>
    </Frame>
  </template>
</v-dialog>
</template>

<script lang="ts">
import VueEvent from '@/utils/event'

import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  computed,
  getUid
} from '@/utils'
import Frame from "./components/frame.vue"
import Contacts from "./components/contacts.vue"
import Group from "./components/group.vue"
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'v-Mood',
  components: {
    Frame,
    Contacts,
    Group
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
    const upload: any = ref(null);
    // const userGroup: any = ref([])
    const tabs = [{
      name: '联系人',
      icon: 'user'
    }, {
      name: '群里',
      icon: 'qun'
    }, {
      name: '消息',
      icon: 'soundsize'
    }, {
      name: '工具',
      icon: 'shezhi'
    }, {
      name: '搜索',
      icon: 'search'
    }]

    VueEvent.on("openChat", (data: any) => {
      isShow.value = true
    })

    // 监听弹窗变量
    watch([isShow], (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = []
      }
    })

    // function Grouping() {
    //   store.dispatch('common/Fetch', {
    //     api: "customGroup",
    //     data: {
    //       coding: "U0700006",
    //       uid: getUid()
    //     }
    //   }).then(res => {
    //     userGroup.value = res.result
    //   })
    // }

    // 关闭
    function hadnleClose() {
      isShow.value = false
      VueEvent.emit("closeChat");
    }

    return {
      tabs,
      isShow,
      dataList,
      content,
      issave,
      current,
      upload,
      hadnleClose
    }
  }
})
</script>

<style lang="less" scoped>
/deep/ .collapse {
  background: transparent;

  .collapse-head {
    background: transparent;
    margin-bottom: 1px;
    padding: 15px;
  }

  .aside-list {
    background: transparent;
  }
}

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
