<template>
<div class="container w1100">
  <div class="module-wrap mb15">
    <div class="module-head p20 ">
      <span>书签</span>
      <span class="right" @click="add('add')"><i class="iconfont icon-anonymous-iconfont font24" />书签类型</span>
      <AddBookmark :render="init" action="edit" />
      <span class="right"><i class="iconfont icon-write" />编辑</span>
    </div>
    <div class="module-content" style="padding: 0 50px !important; min-height: 800px">
      <div class="cate-wrap">
        <div>
          <div style="padding: 10px 0px;">
            <div style="position: relative;">
              <div v-for="(item, index) in dataList.list" :key="index">
                <div style="padding: 6px 0px;"><span class="" style="padding: 6px 10px;">{{item.name}}</span></div>
                <ul class="pl20 clearfix" syle="display: flex; flex-wrap: wrap;">
                  <li class="left" style="padding: 6px 10px; display: flex;" v-for="(data, i) in item.list" :key="i">{{data.name}}</li>
                </ul>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<AddGroup :showAlbum="true" :render="init" v-model:showFlag="showAlbum" v-if="showAlbum" :data="currentData" />

</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  useRouter,
  useRoute,
  ref,
  getUid
} from '@/utils'
import List from "./list.vue"
import Action from "./article_action.vue"
import ArticleView from "./article_detail.vue"
import AddGroup from './components/addGroup.vue'
import AddBookmark from './components/addBookmark.vue'
import * as consts from '@/assets/const'

export default defineComponent({
  name: 'HomeView',
  components: {
    List,
    Action,
    ArticleView,
    AddGroup,
    AddBookmark
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const currentUser = computed(() => store.getters['user/currentUser']);
    const groups = computed(() => store.getters['user/groups']);
    let query: any = computed(() => route.query || "");
    const showAlbum = ref(false)
    const currentData = ref({})
    const dataList = ref([])
    const list: any = ref(null);

    const menu: any = consts.journal;
    menu.map((item: any) => {
      item.path = `/journal?item=${item.value}`
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "bookmark",
        data: {
          uid: getUid()
        }
      }).then(res => {

        dataList.value = res.result

      })
    }

    function handleclick(param: any) {
      // router.push(proxy.const.setUrl({
      //   uid: getUid(),
      //   query: param
      // }))

      // setTimeout(() => {
      //   list.value.init()
      // }, 100)

    }

    function add(action: any, item: any) {
      debugger
      showAlbum.value = true
      currentData.value = {
        action,
        item
      }
    }

    onMounted(() => {
      init()
    })

    return {
      currentUser,
      handleclick,
      groups,
      query,
      menu,
      add,
      list,
      showAlbum,
      currentData,
      dataList
    }
  }
})
</script>
