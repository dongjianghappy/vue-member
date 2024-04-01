<template>
<div>
  <div class="container w1100 mb15 radius-4" style="background: var(--module-background); height: 300px;">
    <div class="activity-banner relative" :style="`background: url(${detail.background}) no-repeat; background-size: cover;`">
      <span class="absolute" style="left: 15px; top: 15px; z-index: 100">
        <v-back />
      </span>
      <div class="absolute" style=" background: rgba(0, 0, 0, 0.35); left: 0; top: 0px; right: 0px; bottom: 0px"></div>
      <span class="absolute" style="top: 0px; right: 0" v-if="userInfo.account">
        <v-selectbackground kind="activity_background" :mask="{ w: 1100, h: 280, tb: 80, lr: 0 }" :data="{id: detail.id}" :style="{width: 1170, height: 570}" :img="{width: 1440}" :size="{width: 1100, height: 200}" /></span>
    </div>
    <div class="activity_wrap relative">
      <div class="absolute  bg-999" style="left: 25px; bottom: 25px; border: 2px solid rgb(255, 255, 255); width: 154px; height: 154px;">
        <img :src="detail.image" onerror="this.src='http://www.yunxi10.com/source/public/images/topic_page_2x.png'" style="width: 150px; height: 150px;" />
        <span class="absolute" style="bottom: 0px; right: 0; width: 16px; height: 16px; z-index: 10" v-if="userInfo.account">
          <v-selectbackground kind="activity_photos" :mask="{ w: 500, h: 400, tb: 0, lr: 100 }" :data="{id: detail.id}" :size="{width: 400, height: 400}" />
        </span>
      </div>
      <div class="pt15 relative" style="padding-left: 200px;">
        <div class="font20">#{{detail.name}}#
          <span class="ml15 font14">{{detail.num}} 人次参与</span>
        </div>
        <div class="mt5 cl-666">
          <span>
            <button class="btn btn-submit mr10 font12" @click="handleCollect(detail)"><i class="iconfont icon-star-1"></i>
              {{detail.hascollect ? '已收藏' : '收藏'}}
              ({{detail.collect || 0}})</button>
            <button class="btn btn-submit font12"><i class="iconfont icon-share-1"></i>分享</button>
            <button class="btn btn-submit font12">浏览量({{detail.visit || 0}})</button>
          </span>
        </div>
        <span class="absolute" style="top: 20px; right: 20px">
          <v-popover content="<i class='iconfont icon-down font18 icon-btn'></i>" arrow="tb" offset="right" :move="-120" :keys="`popover-activity`">
            <div style="width: 150px; height: 100px">
              <ul class="font14">
                <li v-if="module.edit">
                  <Detail action="edit" :data="{coding: 'U0620027', id: detail.id}" :render="init" />
                </li>
                <li v-if="module.vote">
                  <VoteSetting :data="activity" type="activity" />
                </li>
              </ul>
            </div>
          </v-popover>
        </span>
      </div>
    </div>
  </div>
  <div class="container w1100 relative clearfix">
    <div class="main-center left ml0" style="width: 810px;">
      <TalkSend :summary="`#${route.query.item}# `" v-if="userInfo.account">
        <div class="p15" style="color: var(--color-primary);">描述：{{detail.summary || '无'}}</div>
      </TalkSend>
      <Vote :data="vote" v-if="vote.list !== uundefined" />

      <TalkItem :sourceData="dataList.list" />
    </div>
    <div class="w280 right">
      <RightView />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted,
  ref,
  reactive
} from 'vue'
import {
  useStore
} from 'vuex'
import TalkSend from '../index/components/module/talk_send.vue'
import TalkTabs from '../index/components/module/TalkTabs.vue'
import TalkItem from '../index/components/TalkItem/index.vue'
import RightView from './components/right_aside.vue'
import Vote from './vote/index.vue'
import Detail from './components/detail.vue'
import VoteSetting from '../../views/index/components/TalkItem/vote/setting.vue'

import {
  useRouter,
  useRoute
} from 'vue-router'
import {
  codings
} from '@/utils'

export default defineComponent({
  name: 'HomeViewdddf',
  components: {
    TalkSend,
    TalkTabs,
    TalkItem,
    RightView,
    Vote,
    Detail,
    VoteSetting
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const coding = codings.talk
    let data: any = reactive([]);
    const detail: any = ref({})
    const vote: any = ref({});
    const dataList: any = ref({})
    const userInfo = computed(() => store.getters['user/loginuser']);
    const module = computed(() => store.getters['user/config_talk'].activity || []);

    function init() {
      window.scrollTo(0, 0)
      store.dispatch('common/Activity', {
        name: route.query.item
      }).then((res) => {
        detail.value = res.result.basic || {}
        vote.value = res.result.vote || {}
      })
    }

    function weibo(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)

      store.dispatch(`common/Fetch`, {
        api: 'comprehensive',
        data: {
          coding: "U0110000",
          topic: route.query.item,
          ...params
        }
      }).then((res) => {
        dataList.value = res.result
      })
    }

    function handleCollect(param: any) {
      store.dispatch('common/Fetch', {
        api: 'Collect',
        data: {
          coding: coding.activity_collect,
          artid: param.id
        }
      }).then(res => {
        if (res.ifSuccess === 2) {
          return
        }
        param.collect = res.result.num
        if (res.result.state === 1) {
          param.hascollect = 1
        } else {
          param.hascollect = 0
        }

      })
    }

    function visit() {

      store.dispatch('common/Fetch', {
        api: "VisitCommunity",
        data: {
          coding: coding.activity,
          field: 'name',
          value: route.query.item,
        }
      }).then(res => {
        detail.value.visit = parseInt(detail.value.visit)+1
      })
    }

    onMounted(() => {
      init()
      visit()
      weibo()
    })
    return {
      route,
      userInfo,
      module,
      detail,
      vote,
      dataList,
      handleCollect,
      init
    }
  }
})
</script>

<style scoped>
.activity-banner {
  background: #666;
  height: 200px;
}

.activity_wrap {
  height: 100px
}
</style>
