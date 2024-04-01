<template>
<div class="container w1100 mb25" style="background: var(--w-input-div-background);">
  <v-tabs :tabs="tabMenu" :isEmit="true" v-model:index="index">
    <template v-slot:extra>
      <v-space>
        <Detail :data="{coding: coding.art}" />
      </v-space>
    </template>
    <template v-slot:content1>
      <Main :dataList="dataList" :data="{coding}" />
    </template>
    <template v-slot:content2>
      <Blog :dataList="dataList" :data="{coding}" />
    </template>
  </v-tabs>

</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  useStore,
  useRoute,
  ref,
  codings
} from '@/utils'
import Main from './main.vue'
import Blog from './blog.vue'
import Detail from './components/detail.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Main,
    Blog,
    Detail
  },
  setup(props, context) {
    const coding: any = codings.haosite
    const store = useStore();
    const route = useRoute();
    let tabMenu: any = ref([{
        name: "网址导航"
      },
      {
        name: "博客大全"
      }
    ])
    let query: any = computed(() => route.query || "");
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'haosite',
        data: {
          coding: coding.art,
          page: 1,
          pagesize: 20
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      query,
      dataList,
      init,
      tabMenu
    }
  }
})
</script>
