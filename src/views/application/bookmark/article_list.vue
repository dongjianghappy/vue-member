<template>
<div class="module-wrap">
  <div class="module-content p20">
    <div style="height: 165px; overflow: hidden;">
      <div class="mb15 font14">书签({{group.length || 0}})
        <span class="right">
          <v-group action='add' :data="data" :group="group" :coding="data.coding.cate" :render="init" v-if="loginuser.account === userInfo.account" />
        </span>
      </div>
      <v-slider :data="{coding: data.coding.cate}" @onClick="handleclick" :dataList="group" :isCurrentUser="loginuser.account === userInfo.account" />
    </div>
  </div>
</div>
<div class="module-wrap mb15">
  <div class="module-head bd-0 p20">
    <span class="right">
      <AddBookmark :render="init" :data="{...data}" :group="sidebar" v-if="loginuser.account === userInfo.account" />
    </span>
  </div>
  <div class="module-content content-wrap ptb15 pr10" style="min-height: 590px">
    <div class="notes-list relative" v-for="(item, index) in dataList.list" :key="index">
      <div class="notes-content plr5 ptb10" style="background: none; margin-bottom: 0px; border: 0px solid #f3f3f3">
        <div class="pb5 font12">{{item.times}}</div>
        <span class="bold">【{{item.parent}}】</span>
        <span class="ml10">{{item.name}}</span>
        <span class="ml10 cl-red" v-if="loginuser.account === userInfo.account">{{visibles[item.visible || 'public']}}</span>
        <span class="ml10" @click="visit(item)">查看</span>
        <AddBookmark :render="init" action="edit" :data="{...item, ...data}" :group="sidebar" v-if="loginuser.account === userInfo.account" />
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  useStore,
  useRoute,
  watch,
  onMounted,
  computed,
  ref,
  getUid,
} from '@/utils'
import AddBookmark from './components/addBookmark.vue'
import {
  visibles
} from '@/assets/const'
const props: any = defineProps({
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
})
const store = useStore();
const route = useRoute();
const loginuser = computed(() => store.getters['user/loginuser']);
const userInfo = computed(() => store.getters['user/userInfo']);
const dataList = ref([])
const loading: any = ref(false)
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
  init(param)
}

function visit(param: any) {
  window.open(param.url)
}

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 25,
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
    dataList.value = res.result || {}
  })
}

onMounted(init)
</script>
