<template>
<div class="module-wrap mb15">
  <div class="module-head p20 ">
    <a class="mr10" style="display:inline-block">文档</a>
  </div>
  <div class="module-content" style="padding: 0 50px !important; min-height: 500px">
    <v-list :data="dataList" :viewUrl="viewUrl" :editUrl="editUrl" />
    <v-loding v-if="!loading" />
    <div class="pt25" style="padding: 50px;">
      <v-pagination :toall="dataList.length" />
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
  watch,
  onMounted,
  ref,
  codings,
  getUid
} from '@/utils'

export default defineComponent({
  name: 'HomeView',
  props: {
    item: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const dataList = ref([])
    let m: any = route.query.mod;
    const loading: any = ref(false)
    const editUrl: any = `/journal/?item=details&action=edit`
    const viewUrl: any = `/journal/?item=view`

    watch(() => route.query.item, () => {
      init()
    })

    function init() {
      loading.value = false
      dataList.value = []
      store.dispatch('common/Fetch', {
        api: 'Journal',
        data: {
          uid: getUid(),
          id: route.query.id
        }
      }).then(res => {
        loading.value = true
        dataList.value = res.result
      })
    }
    
    onMounted(init)
    return {
      dataList,
      loading,
      init,
      viewUrl,
      editUrl
    }
  }
})
</script>
