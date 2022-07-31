<template>
<div class="module-wrap mb15">
  <div class="module-head p20 ">
    <a class="mr10" style="display:inline-block">文档</a>
  </div>
  <div class="module-content" style="padding: 0 50px !important; min-height: 500px">
    <v-list :data="dataList" viewUrl="/journal/?item=view" editUrl="/journal/?item=details&action=edit" />
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
  useStore,
  useRoute,
  watch,
  onMounted,
  ref,
  getUid
} from '@/utils'

export default defineComponent({
  name: 'HomeView',
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const dataList = ref([])
    let m: any = route.query.mod;
    const loading: any = ref(false)

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
      init
    }
  }
})
</script>
