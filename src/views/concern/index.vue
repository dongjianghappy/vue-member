<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="module.concern" title="用户组" :render="Grouping">
      <template v-slot:button>
        <v-group action='add' :data="data" :group="userGroup" :coding="coding.group" :render="Grouping"  />
      </template>
      <template v-slot:aside v-if="loginuser.currentUser">
        <ul>
          <li v-for="(item, index) in userGroup" :key="index" @click="handleclick(`/concern?mod=myconcern&ground=${item.id}`)" class="aside">
            <i class="iconfont icon-dot font20"></i> {{item.name}}({{item.num}})
          </li>
        </ul>
      </template>

    </v-aside>
  </div>
  <div class="m0 right" style="width: 910px;">
    <div class="module-wrap">
      <div class="module-content p15" style="min-height: 570px;">
        <div class="mb15 font18 bold">粉丝关注</div>
        <Card :data="concern" :mod="mod" :group="userGroup" :render="Grouping" v-if="concern.length> 0 " />
        <v-nodata v-else trip="暂时没有数据" />
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
  onMounted,
  ref,
  getUid,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
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
    Card
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings.user
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const showAlbum = ref(false)
    const userGroup = ref([])
    const menu: any = group
    const userInfo: any = computed(() => store.getters['user/userInfo']);
    const module = computed(() => store.getters['user/config_talk']);
    const currentData = ref({})
    module.value.concern.map((item: any) => {
      item.path = `/concern${item.value}`
      if (item.url === 'myconcern') {
        item.num = userInfo.myconcern || '0'
      } else {
        item.num = userInfo.concernmy || '0'
      }

    })
    const mod = computed(() => route.query.mod);

    const loginuser = computed(() => store.getters['user/loginuser']);
    const concern = computed(() => store.getters['common/concernList']);

   

    function Grouping() {
      store.dispatch('common/Fetch', {
        api: "customGroup",
        data: {
          coding: coding.group,
          uid: getUid()
        }
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

    onMounted(() => {
      Grouping()
    })
    return {
      coding,
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
      loginuser,
      module
    }
  }
})
</script>
