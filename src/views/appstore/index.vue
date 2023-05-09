<template>
<div class="container w1100 clearfix">

  <div v-if="mod">
    <Article :channel="mod" />
  </div>
  <div v-else>
    <div class="w180 left">
      <v-aside :data="menu" title="应用中心" @route="onclicks" />
    </div>
    <div class="w85 m0 right" style="width: 910px">
      <div class="module-wrap mb15" v-if="Tabs === '0'">
        <div class="module-head p20">社区推荐</div>
        <div class="module-content" style="min-height: 500px; height:auto">

          <div class="col-md-3 p10" v-for="(item, index) in brand" :key="index">
            <div style="background: #e1e1e1; width: 100%; height: 160px;" @click="visit(item)">
              <img :src="item.img[0]" style="width: 100%; height: 160px; border-radius: 5px;">
            </div>
            <div class="app-name">{{item.name}}</div>
          </div>

        </div>
      </div>
      <div class="module-wrap mb15" v-else-if="Tabs === '1'">
        <div class="module-head p20">频道中心</div>
        <div class="module-content" style="min-height: 500px; height:auto">

          <div class="col-md-3 appstore relative" v-for="(item, index) in appstore" :key="index" @click="handleclick(`/${item.module}`, item.grade)">
            <div class="app">
              <div class="app-img">
                <i class="iconfont icon-grade font24 absolute" style=" right: 0; bottom: 0; color:  #ccc "></i>
                <img :src="item.image" style="width: 156px; height: 150px" >
              </div>
              <div class="app-name">{{item.name}}</div>
            </div>
            <div class="app-shadow"></div>
          </div>

        </div>
      </div>
      <div class="module-wrap mb15" v-else-if="Tabs === '2'">
        <div class="module-head p20">应用中心</div>
        <div class="module-content p0" style="min-height: 500px; height:auto">

          <div class="media-wrap p25 bg-f9f9f9 b0" style="margin-bottom: 2px; text-align:center" v-for="(item, index) in appstore" :key="index">
            <div class="media-left">
              <img :src="item.image" class="left mr15" style=" width:45px; height:45px; border-radius: 50%;">
            </div>
            <div class="media-body align_left" style="padding:14px; width:100%;">
              <div>
                <span class="font14" style="color: #f67f00;">{{item.name}}</span>
                <span style="color: #ccc;">({{item.description || "暂无描述"}})</span>
                <span class="right pointer" v-if="item.grade === '1'" @click="handleclick(`/appstore/?mod=${item.module}`)">进入</span>
                <span v-else class="right pointer">开通</span>
                <span class="right mr15">开通时间: 2019-8-12</span>
              </div>
              <div></div>
            </div>
          </div>

        </div>
      </div>
      <div class="module-wrap mb15" v-else>
        <div class="module-head p20">功能特权</div>
        <div class="module-content p0" style="min-height: 500px; height:auto">

          <div class="media-wrap p25 bg-f9f9f9 b0" style="margin-bottom: 2px; text-align:center" v-for="(item, index) in appstore" :key="index">
            <div class="media-left">
              <img :src="item.image" class="left mr15" style=" width:45px; height:45px; border-radius: 50%;">
            </div>
            <div class="media-body align_left" style="padding:14px; width:100%;">
              <div>
                <span class="font14" style="color: #f67f00;">{{item.name}}</span>
                <span style="color: #ccc;">({{item.description || "暂无描述"}})</span>

                <span class="right pointer" v-if="item.grade === '1'" @click="handleclick(`/appstore/?mod=${item.module}`)">进入</span>
                <span v-else class="right pointer">开通</span>
                <span class="right mr15">开通时间: 2019-8-12</span>
              </div>
              <div></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  useRoute,
  ref,
  onMounted
} from '@/utils'
// import Article from "./article/index.vue"
import {
  appMenu
} from '@/assets/const'

export default defineComponent({
  name: 'AppstoreView',
  components: {
    // Article,
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const appstore = computed(() => store.getters['common/appstore']);
    const brand: any = ref([])
    const menu: any = appMenu
    const Tabs = ref("0")
    let mod: any = computed(() => route.query.mod || "");
    const loginuser = computed(() => store.getters['user/loginuser']);

    function handleclick(param: any, grade: any) {
      if (grade !== '1') {
        proxy.$hlj.message({
          msg: "您还没拥有该模块权限"
        })
        return
      }
      mod = param
      router.push(`${proxy.const.u}${loginuser.value.account}${param}`)
    }

    function onclicks(param: any) {
      Tabs.value = param
      if (param !== '0') {
        store.dispatch('common/Appstore', {
          type: param
        })
      } else {
        store.dispatch('common/Fetch', {
          api: "BrandCommunity"
        }).then(res => {
          brand.value = res.result

        })
      }
    }

    function visit(param: any) {
      const {
        id
      } = param

      store.dispatch('common/Fetch', {
        api: "VisitCommunity",
        data: {
          id
        }
      }).then(res => {
        window.open(param.url)

      })
    }

    onMounted(() => {
      store.dispatch('common/Fetch', {
        api: "BrandCommunity"
      }).then(res => {
        brand.value = res.result
      })
    })
    return {
      mod,
      appstore,
      brand,
      handleclick,
      onclicks,
      Tabs,
      visit,
      menu
    }
  },
})
</script>
