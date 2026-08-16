<template>
    <div class="container w1100">
        <div class="container trackmap-wrap fixed flex">
            <div class="trackmap">
              <div class="absolute" style="z-index: 100000; width: calc(100% - 250px); height: 50px;">
                  <div class="flex">
                      <div class="p15 font18" style="flex: 1">
                          {{currentData.title || "全部"}}记录
                      </div>
                      <div class="p15 pt25 w100">
                          <v-back />
                      </div>
                      <div class="p15">
                          <Tool :data="{...detail, currentData}" :render="init" />
                      </div>
                  </div>
              </div>
                <Info :detail="detail" :render="init" />
                <Content :dataList="dataList" :render="init" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRouter,
  useRoute,
  ref,
  onMounted,
} from '@/utils'
import Info from "./info.vue"
import Content from "./content.vue"
import Tool from './components/tool.vue'
const router = useRouter();
const route = useRoute();
const store = useStore();
const detail: any = ref({})
const dataList: any = ref([])
const loginuser: any = computed(() => store.getters['user/loginuser']);
const currentData: any = ref({
  title: ''
})

function getDetail(){
  store.dispatch('common/Fetch', {
    api: 'scheduleDetailInfo',
    data: {
      id: route.query.id
    }
  }).then((res: any) => {
    detail.value = res.result
    init()
  })
  
}


function init(param: any = {}){

  const params: any = {
    page: 1,
    pagesize: 1000
  }

  Object.assign(params, param)

  store.dispatch('common/Fetch', {
  api: 'scheduleRecord',
  data: {
    id: route.query.id,
    system: detail.value.system,
    ...params
  }
}).then((res: any) => {
  dataList.value = res.result || []
})
}

onMounted(() => {
  getDetail()
})
</script>

<style lang="less" scoped>
.trackmap-wrap {
  background: var(--module-background);
  top: 60px;
  bottom: 0px;
  left: 0;
  right: 0;
  .trackmap {
    background: var(--card-background);
    position: absolute;
    top: 25px;
    bottom: 25px;
    left: 25px;
    right: 25px;
    padding-left: 250px;
    border-radius: 8px;
    overflow: hidden;
  }
}

</style>