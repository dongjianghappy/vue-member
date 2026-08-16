<template>
    <v-button v-model:show="isShow">
        <i class="iconfont icon-edit" />设置
    </v-button>
    <v-dialog v-model:show="isShow" ref="form" title="" :style="{width: 750, height: 500}" :confirm="true" :hasfooter="false">
        <template v-slot:content>
            <v-tabs :tabs="[{name: '已加入的',value: 'photos'},{name: '在线查找',value: 'background'}]" :isEmit="true" v-model:index="index">
                <template v-slot:content1>
                    <div class="p15" style="overflow-y: scroll; height: 330px">
                        <div class="flex" v-for="(item, index) in dataList" :key="index" style="border-bottom: 1px solid var(--default-border); align-items: center;">
                            <div class="align_left" style="width: 64px">
                                <i class="iconfont icon-img font36" />
                            </div>
                            <div class="p10" style="width: 150px">{{item.name}}
                                <span class="mr10">
                                    <Detail action="edit" :data="{id: item.id, coding: data.coding}" :render="init" v-if="item.complete === '1'" />
                                </span>
                            </div>
                            <div class="p10" style="flex: 1"></div>
                            <div class="p10 align_right" style="width: 60px">
                                <i class="iconfont icon-return1" @click="handleExit(item)" />
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:content2>
                    <div>
                        <div class="talk-search">
                            <div class="search-box">
                                <i class="iconfont icon-search"></i>
                                <input type="text" placeholder="名称或账号检索" class="w-full" v-model="content" @input.enter="handleSearch">
                            </div>
                        </div>
                        <div class="p15" style="overflow-y: scroll; height: 272px">
                            <div class="flex" v-for="(item, index) in scheduleList" :key="index" style="border-bottom: 1px solid var(--default-border); align-items: center;">
                                <div class="align_left" style="width: 64px">
                                    <i class="iconfont icon-img font36" />
                                </div>
                                <div class="p10" style="width: 150px">{{item.name}}
                                    <span class="mr10">
                                        <Detail action="edit" :data="{id: item.id, coding: data.coding}" :render="init" v-if="item.complete === '1'" />
                                    </span>
                                </div>
                                <div class="p10" style="flex: 1"></div>
                                <div class="p10 align_right" style="width: 60px">
                                    <i class="iconfont icon-concern-1" @click="handleJoin(item)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </v-tabs>
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
  dataList: {
    type: Array,
    default: () => {
      return []
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
const scheduleList: any = ref([])

// 监听弹窗变量
watch([isShow], (newValues, prevValues) => {
  if (isShow.value) {
 
  }
})

// 加入
function handleJoin(param: any) {
  store.dispatch('common/Fetch', {
    api: "confirmBindUser",
    data: {
      operation: 'add',
      method: 'user',
      fid: param.id
    }
  }).then(res => {
    props.render()
  })
}

// 退出
function handleExit(param: any) {
  store.dispatch('common/Fetch', {
    api: "confirmBindUser",
    data: {
      operation: 'remove',
      method: 'user',
      fid: param.id
    }
  }).then(res => {
    props.render()
  })
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
    api: "userSchedule",
    data: {
      word: content.value,
      ...params
    }
  }).then(res => {
    scheduleList.value = res.result || []
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
