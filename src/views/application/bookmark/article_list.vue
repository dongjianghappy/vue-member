<template>
<div class="module-wrap mb15">
  <div class="module-head p20 font16">
    {{cateName.name}}({{dataList.length || 0}})
    <span class="right">
      <AddBookmark :render="init" :data="{fid: cateName.id, coding: 'U30005'}" v-if="cateName.id" /></span>
  </div>
  <div class="module-content content-wrap ptb15 pr10 bg-white" style="min-height: 560px">
    <div class="notes-list relative" v-for="(item, index) in dataList" :key="index">
      <div class="notes-content plr5 ptb10" style="background: none; margin-bottom: 0px; border: 0px solid #f3f3f3">
        <div class="pb5 font12">{{item.times}}</div>
        <span @click="visit(item)">{{item.name}}</span>
        <AddBookmark :render="init" action="edit" :data="{...item, fid: cateName.id, coding: 'U30005'}" />
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
  ref,
  getUid,
  useRouter
} from '@/utils'
import AddBookmark from './components/addBookmark.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    AddBookmark
  },
  props: {
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
    const dataList = ref({})
    let m: any = route.query.mod;
    const loading: any = ref(false)
    const cateName: any = ref({
      id: '',
      name: '所有的'
    })
    const typeName: any = ref("")

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

      if (route.query.item == 'list') {
        if (route.query.id == '0') {
          cateName.value.name = "未分类"
        } else {
          let arr = props.group.filter((item: any) => item.id === route.query.id)
          if(arr && arr[0]){
cateName.value.id = arr[0].id
          cateName.value.name = arr[0].name
          }
          
        }
      }else{
        cateName.value.name = typeName.value || "所有的"
        cateName.value.id = ""

      } 

      typeName.value = ""

      const params: any = {
        uid: getUid(),
        fid: route.query.id,
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
        debugger
        loading.value = true
        dataList.value = res.result
      })
    }

    onMounted(init)
    return {
      dataList,
      loading,
      init,
      cateName,
      typeName,
      handleclick,
      handleedit,
      visit
    }
  }
})
</script>
