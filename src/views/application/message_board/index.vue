<template>
<div>
  <div class="container w1100">
    <UserInfoHead />
  </div>

  <div class="container w1100 clearfix">
    <div class="w180 left">
      <v-aside :data="module.home_nav" :isFixed="false">
        <template v-slot:button>
        </template>
      </v-aside>
    </div>
    <div class="m0 right" style="width: 910px">
      <div class="module-wrap mb15">
        <div class="module-content" style="min-height: 650px;">
          <v-tabs :tabs="[{name: '给我留言',value: 'photos'},{name: '我留言的',value: 'background'}]" :isEmit="true" v-model:index="index">
            <template v-slot:content1>
              <Send :render="init" v-if="!loginuser.currentUser && isTome" />
              <List :dataList="dataList" :isTome="isTome" :render="init" />
            </template>
            <template v-slot:content2>
              <List :dataList="dataList" :isTome="isTome" :render="init" />
            </template>
          </v-tabs>

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  computed,
  ref,
  onMounted,
  getUid,
  watch
} from '@/utils'
import UserInfoHead from '../../home/components/UserInfoHead.vue'
import Send from './components/send.vue'
import List from './components/list.vue'
import {
  feedback
} from '@/assets/const'

export default defineComponent({
  name: 'MessageBoardView',
  components: {
    UserInfoHead,
    Send,
    List
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const isTome: any = ref(true);
    const loginuser = computed(() => store.getters['user/loginuser']);
    let dataList: any = ref({})
    const loading: any = ref(false)
    const menu: any = feedback;
    const module = computed(() => store.getters['user/config_talk']);
    menu.map((item: any) => {
      item.name = item.names[0]
      item.path = `/application?mod=feedback&item=${item.value}`
    })

    watch(() => route.query.item, () => {
      isTome.value = route.query.item === 'tome' ? true : false
    })

    function init(param: any = {}) {
      loading.value = false

      const params: any = {
        item: route.query.item,
        uid: getUid(),
        page: 1,
        pagesize: 25
      }

      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        api: "userMessageBoard",
        data: {
          ...params
        }
      }).then(res => {
        loading.value = true
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      route,
      isTome,
      dataList,
      loading,
      loginuser,
      menu,
      init,
      module
    }
  }
})
</script>
