<template>
<ul class="clearfix">
  <li class="col-sm-6 col-md-6 p10" v-for="(item, index) in data" :key="index">
    <div class="grid-wrap" style="height: 120px">
      <div class="grid-left">
        <a @click="handleGoto(item.account)">
          <img :src="item.photos" width="50" height="50" style="vertical-align:middle; border-radius:50%; " class="showuserinfo" data-uid="1105825974" data-placement="automatic" data-toggle="tooltip17">
        </a>
      </div>
      <div class="grid-body">
        <p style="font-weight:bold;">
          {{item.nickname}}
          <i class="iconfont icon-male" v-if="item.sex === '1'"></i>
          <i class="iconfont icon-female" v-else></i>
        </p>
        <p>
          <a>上海</a> |
          <a @click="handleClickss(item.account, 'myconcern')"><span>关注</span>{{item.myconcern}}</a> |
          <a @click="handleClickss(item.account, 'concernmy')"><span>粉丝</span>{{item.concernmy}}</a> |
          <a><span>话题</span>{{item.talk}}</a>
        </p>
        <p>{{item.signature}}</p>
      </div>
      <div class="right" style="width:50%" v-if="currentUser">
        <span class="concern" @click="concern(item)" style=" width:auto; height:20px; line-height:20px; display:block; text-align:center; cursor:pointer; position: absolute; top: 25px; right: 80px;">
          {{item.concern_status}}</span>
        <span class="infos demoimg" data-placement="top" data-toggle="tooltip17" style="width:60px; height:20px; line-height:20px; display:block; text-align:center; cursor:pointer; position:absolute; top:25px; right:15px;" data-left="-90">
          <v-popover content="<i class='iconfont icon-down font18'></i>" arrow="tb" offset="right" :move="-60" :keys="`popover-${index}`" v-if="mod === 'myconcern'">

            <div class="p15" style="width: 150px; height: 250px">
              <ul class="font14" style="display: block">
                <li style="height: 32px" v-for="(data, i) in group" :key="i" @click="handleClick({ friend_uid: item.friend_uid, grouping: data.id })">{{data.name}}({{data.num}})</li>
              </ul>
            </div>
          </v-popover>
        </span>
      </div>
    </div>
  </li>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import {
  useRouter,
  useRoute,
  onBeforeRouteUpdate
} from 'vue-router'
import {
  getUid
} from '@/utils'

export default defineComponent({
  name: 'AsideView',
  props: {
    data: {
      type: Object,
      defualt: () => {
        return 
      }
    },
    mod: {
      type: String,
      default: "concernmy"
    },
    group: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const currentUser = computed(() => store.getters['user/currentUser']);

    // 点击关注
    function concern(item: any) {
      store.dispatch('common/Fetch', {
        api: "Concern",
        data: {
          uid: item.uid || item.friend_uid
        }
      }).then(res => {
        if (res.returnMessage === "你已取消关注") {
          item.concern_status = "关注Ta"
        } else {
          item.concern_status = "互相关注"
        }
        // userInfo.value.concernstatus = res.result.status
      })
    }

    function handleClickss(uid: any, param: any) {

      window.location.href = proxy.const.setUrl({
        uid: uid,
        query: `/concern?mod=${param}`
      })
    }

    function handleClick(param: any) {
      store.dispatch('common/Fetch', {
        api: "UpdateGrouping",
        data: {
          ...param
        }
      }).then(res => {
        props.render()
      })

    }

    function handleGoto(uid: any) {
      debugger
      if (getUid() !== uid) {
        const path = window.location.pathname.split("/")
        window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}/home`;
      } else {
        router.push(`${proxy.const.u}${uid}/home`)
      }
    }

    return {
      concern,
      handleClick,
      handleClickss,
      handleGoto,
      currentUser
    }
  }

})
</script>
