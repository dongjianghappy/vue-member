<template>
    <v-button v-model:show="isShow">
        添加成员
    </v-button>
    <v-dialog v-model:show="isShow" ref="form" title="添加成员" :style="{width: 450, height: 500}" :confirm="true" @submit="submit">
        <template v-slot:content>
            <div>
                <div class="talk-search">
                    <div class="search-box">
                        <i class="iconfont icon-search"></i>
                        <input type="text" placeholder="名称或账号检索" class="sm-input w-full" v-model="content" @input.enter="handleSearch">
                    </div>
                </div>
                <ul style="height: 300px; overflow: auto;">
                    <li v-for="(item, index) in dataList" :key="index" class="ptb10 flex" style="align-items: center;" @click="handleClick(item)">
                        <div class="w100"><v-photos :sourceData="item" /></div>
                        <div class="w120">{{item.nickname}}</div>
                        <div class="nowrap" style="flex: 1"></div>
                        <div class="w80"><i class="iconfont icon-dagou" :class="{'cl-green': currentRelation.id == item.id}" /></div>
                    </li>
                </ul>
            </div>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  ref,
  useStore,
  watch
} from '@/utils'
import QrcodeVue from 'qrcode.vue'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  }
})
const emit: any = defineEmits(['onLocaltion'])
const store = useStore()
const isShow = ref(false)
const content: any = ref("")
const currentRelation: any = ref({})
const dataList: any = ref([])

// 监听弹窗变量
watch([isShow], (newValues, prevValues) => {
  if (isShow.value) {
    handleSearch()
  }
})

function handleClick(param: any) {
  currentRelation.value = param
}

function handleSearch() {
  const params: any = {
    coding: props.data.coding,
    pagesize: 50
  }

  if(!content.value){
    return
  }

  store.dispatch('common/Fetch', {
    api: "bindUser",
    data: {
      word: content.value,
      ...params
    }
  }).then(res => {
    dataList.value = res.result || []
  })
}

function submit() {
  store.dispatch('common/Fetch', {
    api: "confirmBindUser",
    data: {
      operation: "add",
      fid: props.data.id,
      uid: currentRelation.value.account
    }
  }).then(res => {
    props.render()
    isShow.value = false
  })
}
</script>

<style scoped>
.li {
  background: #ccc;
  height: 75px;
  border-radius: 5px;
  line-height: 75px;
  color: #fff;
}

.current {
  background: #8bc34a;
}
</style><style lang="less" scoped>
.talk-search {
  display: flex;
  margin-bottom: 25px;
  .search-box {
    display: flex;
    flex: 1;
    background: var(--input-background);
    border-radius: 50px;
    height: 34px;
    padding: 0 10px;

    i {
      margin: 0;
      margin-right: 5px;
      padding-top: 7px;
      width: 25px;
      font-size: 22px;
    }

    input {
      background: none;
      max-width: 100%;
      border: 0;
      border-radius: 0;
      padding: 0;
      font-size: 14px;
    }
  }

  .search-button {
    width: 50px;
    line-height: 34px;
    text-align: center;
  }
}
</style>
