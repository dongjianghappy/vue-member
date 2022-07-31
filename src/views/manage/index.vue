<template>
<div class="container w1100 clearfix">
  <div class="w180 left">

    <div class="module-wrap mb15 w180 aside_nav sidebar_fixed">
      <div class="module-head head p20 font14">管理中心 <span class="right"></span></div>
      <div class="module-content p0 h500">
        <div class="aside" v-for="(item, index) in menu" :key="index">
          <div class="aside-head" v-if="item.children" @click="handleShow(item)">
            <i class="iconfont icon-arrow arrow " :class="item.isshow ? 'deg90' : ''"></i>
            <span>{{item.name}}</span></div>
          <div class="aside-list" v-if="item.children" v-show="item.isshow">
            <ul>
              <li class="pl50 pointer" v-for="(list, i) in item.children" :key="i" @click="handleclick(list)">
                <span>{{list.name}}</span></li>
            </ul>
          </div>
          <div class="aside-list" v-else>
            <ul>
              <li class="pointer pl20" @click="handleclick(item)"><i class="iconfont" :class="`icon-${item.icon}`"></i> <span>{{item.name}}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="m0 right" style="width: 910px;">
    <div class="module-wrap">
      <div class="module-content p10" style="min-height: 570px;">
        
      </div>
    </div>

  </div>

</div>
<AddGroup :showAlbum="true" :render="Grouping" v-model:showFlag="showAlbum" v-if="showAlbum" :data="currentData" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted,
  ref
} from 'vue'
import {
  getUid
} from '@/utils'
import {
  useStore
} from 'vuex'
import AddGroup from './components/addGroup.vue'
import {
  group
} from '@/assets/const'
import Card from './components/card.vue'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'IndexView1',
  components: {
    AddGroup,
    Card
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const showAlbum = ref(false)
    const userGroup = ref([])
    const menu: any = ref([{
      name: "统计",
      value: "1",
      isshow: false,
      children: [{
        name: 'IP'
      }]
    }])
    const userInfo: any = computed(() => store.getters['user/userInfo']);
    const currentData = ref({})

    const mod = computed(() => route.query.mod);

    const loginuser = computed(() => store.getters['user/loginuser']);
    const concern = computed(() => store.getters['common/concernList']);
    const currentUser = computed(() => store.getters['user/currentUser']);

    function Grouping() {
      store.dispatch('common/Fetch', {
        api: "Grouping"
      }).then(res => {

        userGroup.value = res.result
        init()
      })
    }

    function init() {
      store.dispatch('common/ConcernList', {
        uid: getUid(),
        ground: route.query.ground,
        type: mod.value === 'myconcern' ? "myconcern" : "concernmy"
      })
    }

    function add(action: any, item: any) {

      showAlbum.value = true
      currentData.value = {
        action,
        item
      }

    }

    function handleclick(param: any) {
      router.push(proxy.const.setUrl({
        uid: loginuser.value.account,
        query: param
      }))

      setTimeout(() => {
        init()
      }, 100)
    }

    function handleShow(params: any) {
      debugger
      menu.value.map((item: any) => {
        if (item.value === params.value) {
          params.isshow = !params.isshow
        } else {
          item.isshow = false
        }
      })

    }

    onMounted(() => {
      Grouping()
    })
    return {
      init,
      mod,
      concern,
      menu,
      userGroup,
      Grouping,
      add,
      showAlbum,
      handleclick,
      currentData,
      currentUser,
      handleShow
    }
  }
})
</script>
