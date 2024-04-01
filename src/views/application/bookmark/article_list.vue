<template>
  <div class="module-wrap mb15">
    <div class="module-head bd-0 p20 font16">
      {{cateName.name}}({{dataList.length || 0}})
      <span class="right">
        <span class="mr15">
          <v-condition name="分类"
                       field="id"
                       :enums="sidebar"
                       :defaultValue="{name: '全部', value: ''}"
                       :render="init" />
        </span>
        <v-group action='add'
                 :data="data"
                 :group="group"
                 :coding="data.coding.cate"
                 :render="init" />
        <AddBookmark :render="init"
                     :data="{...data}"
                     :group="sidebar" />
      </span>
    </div>
    <div class="module-content content-wrap ptb15 pr10"
         style="min-height: 590px">
      <div class="notes-list relative"
           v-for="(item, index) in dataList"
           :key="index">
        <div class="notes-content plr5 ptb10"
             style="background: none; margin-bottom: 0px; border: 0px solid #f3f3f3">
          <div class="pb5 font12">{{item.times}}</div>
          <span class="bold">【{{item.parent}}】</span>
          <span class="ml10">{{item.name}}</span>
          <span class="ml10 cl-red">{{visibles[item.visible || 'public']}}</span>
          <span class="ml10"
                @click="visit(item)">查看</span>
          <AddBookmark :render="init"
                       action="edit"
                       :data="{...item, ...data}"
                       :group="sidebar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  useRoute,
  watch,
  onMounted,
  computed,
  ref,
  getUid,
  useRouter
} from '@/utils'
import AddBookmark from './components/addBookmark.vue'
import {
  visibles
} from '@/assets/const'
export default defineComponent({
  name: 'HomeView',
  components: {
    AddBookmark
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    group: {
      type: Object,
      default: () => {
        return {}
      }
    },
    query: {
      type: String,
      default: 'all'
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router = useRouter()
    const dataList = ref([])
    let m: any = route.query.mod;
    const loading: any = ref(false)
    const cateName: any = ref({
      id: '',
      name: '所有的'
    })
    const typeName: any = ref("")
    const sidebar = computed(() => {
      const sidebars = props.group.map((item: any) => {
        return {
          name: item.name,
          value: item.id
        }
      })
      return sidebars
    });

    watch(() => route.query.item, () => {
      init()
    })

    function handleclick(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/journal?item=view&id=${param.id}`
      }))
    }

    function handleedit(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `/journal?item=details&action=edit&id=${param.id}`
      }))
    }

    function visit(param: any) {
      window.open(param.url)
    }

    function init(param: any = {}) {
      const params: any = {
        uid: getUid(),
        fid: param.id,
      }

      Object.assign(params, param)

      loading.value = false
      dataList.value = []
      store.dispatch('common/Fetch', {
        api: 'bookmark',
        data: {
          ...params
        }
      }).then(res => {
        loading.value = true
        dataList.value = res.result || []
      })
    }

    onMounted(init)
    return {
      visibles,
      dataList,
      loading,
      init,
      cateName,
      typeName,
      handleclick,
      handleedit,
      visit,
      sidebar
    }
  }
})
</script>
