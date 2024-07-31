<template>
<div>
  <div class="con-list" v-for="(item, index) in sourceData" :key="index">
    <template v-if="item.talkType === 'user'">
      <div class="con-wrap">
        <div class="photos">
          <v-photo :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === item.uid" />
          <v-photos :sourceData="item" v-else />
        </div>
        <div class="user_info pb5"><span class="username">
            {{item.nickname}}
          </span>
          <span class="right span-icon" v-if="item.model === 'member_talk' && loginuser.account && item.management_checked === '-1'">
            <v-popover content="<i class='iconfont icon-down font18 icon-btn'></i>" arrow="tb" offset="right" :move="-50" :keys="`popover-${item.id}`">
              <div style="width: 150px">
                <ul class="font14">
                  <template v-if="loginuser.account === item.uid">
                    <li v-if="module.edit">
                      <Detail :data="item" action="commit" />
                    </li>
                    <li @click="deleteTalk(item.id)" v-if="module.delete">删除</li>
                  </template>
                </ul>
              </div>
            </v-popover>
          </span>
        </div>
        <div class="user_from pb5">{{item.times}}</div>
        <div class="user_from mtb10 p10 font14 radius-4" style="background: var(--card-background)" v-if="item.management_checked === '-1'">退回原因：<span class="cl-red">{{item.return_reason}}，系统已删除，请重新修改再提交，感谢您的配合。</span></div>
        <div class="user_text markdown">
          <div class="relative" style="min-height: 30px" v-if="item.summary">
            <span v-html="item.summary.replace(/\n/g, '<br/>')"></span>
            <v-audio :data="item" :hasMusic="true" v-if="item.background_music" />
            {{item.music_name}}
          </div>
          <!--转载渲染-->
          <template v-if="item.list">
            <div v-for="(list, i) in item.list" :key="i">
              <div v-if="list.video || list.image" style="background:#eee; margin-top: 5px; margin-left: -80px; margin-right: -15px; margin-bottom: -15px; padding-top: 10px; padding-left: 80px; padding-right:15px;    padding-bottom: 15px;">
                <div class="mb5">
                  <span @click="handleClick(list.account || list.uid)" class="showuserinfo" style="color: #eb7350;">@{{list.nickname}}</span>
                  <span v-html="list.summary.replace(/\n/g, '<br/>')"></span>
                </div>
                <Video :sourceData="sourceData" :data="list" :item="item" v-if="list.video" />
                <Audio :sourceData="sourceData" :data="list" :item="item" v-if="list.audio" />
                <Images :data="list" v-else-if="list.image.length > 0" />
              </div>
              <div v-else>
                <!-- 这部分显示最后转载用户吧 -->
                <span @click="handleClick(list.account || list.uid)" class="showuserinfo" style="color: #eb7350;">@{{list.nickname}}</span>
                <span v-html="list.summary.replace(/\n/g, '<br/>')"></span>
              </div>
            </div>
          </template>
          <!--原文渲染-->
          <div v-else>
            <Video :sourceData="sourceData" :data="item" v-if="item.type == 'video'" />
            <Audio :dataList="sourceData" :data="item" v-else-if="item.model=='sound'" />
            <Images :data="item" v-else />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="con-wrap">
        <div class="photos">
          <v-photos :sourceData="item" />
        </div>
        <div class="user_info pb5"><span class="username">{{item.nickname}}</span>
          <span class="right span-icon">

          </span>
        </div>
        <div class="user_from pb5">{{item.times}}</div>
        <div class="user_text markdown" v-if="item.summary">
        </div>
      </div>
    </template>
  </div>
  <v-nodata v-if="!sourceData.length && loading" trip="暂无内容" />
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  useRouter,
  getUid
} from '@/utils'
import Images from './components/image.vue'
import Video from './components/video.vue'
import Audio from './components/audio.vue'
import Detail from './components/detail.vue'

const props: any = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  sourceData: {
    type: Array,
    default: () => {
      return []
    }
  },
  deleteTalk: {
    type: Function,
    default: () => {
      return
    }
  },
  showComment: {
    type: Boolean,
    default: false
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter();
const loginuser = computed(() => store.getters['user/loginuser']);
const module = computed(() => store.getters['user/config_talk'].talk_operation || []);

function handleClick(uid: any) {
  if (getUid() !== uid) {
    const path = window.location.pathname.split("/")
    window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}/home`;
  } else {
    router.push(`${proxy.const.u}${uid}/home`)
  }
}

function handleRouter(type: any, param: any) {
  if (type === 'istop') {
    store.dispatch('common/Fetch', {
      api: "changeData",
      data: {
        coding: param.coding,
        id: param.id,
        field: 'istop',
        value: param.istop == '1' ? '0' : '1'
      }
    }).then((res: any) => {
      param.istop = param.istop == '1' ? '0' : '1'
    })
  } else {
    router.push(`/${type}?id=${param.id}`)
  }
}

function handleVisible(type: any, param: any) {
  store.dispatch('common/Fetch', {
    api: 'setVisible',
    data: {
      id: param.id,
      visible: type
    }
  }).then(res => {
    param.visible = res.result
  })
}

function setPay(param: any) {
  store.dispatch('common/Fetch', {
    api: 'updateStatus',
    data: {
      coding: param.coding,
      id: param.id,
      status: 'pay'
    }
  }).then(res => {
    param.pay = res.result.value
  })
}

function setDownload(param: any) {
  store.dispatch('common/Fetch', {
    api: 'updateStatus',
    data: {
      coding: param.coding,
      id: param.id,
      status: 'isdownload'
    }
  }).then(res => {
    param.isdownload = res.result.value
  })
}


</script>

<style lang="less" scoped>
.share {
  position: relative;
  overflow: hidden;

  .shares {
    position: absolute;
    transition: top 0.3s ease;
    top: 0;
  }

  .copy {
    position: absolute;
    top: 32px;
  }

  &:hover {
    .shares {
      top: -32px;
    }

    .copy {
      top: 0;
      transition: top 0.3s ease;
    }
  }
}
</style>
