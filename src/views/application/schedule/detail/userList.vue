<template>
    <div class="home">
        <div class="module-wrap">
            <div class="module-head">
              参与用户
              <span class="right"><BindUser :data="{id: route.query.id}" :render="init" /></span>
            </div>
            <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 560px">
                <div class="p10 font16 item-thum-wrap" style="overflow: hidden;" v-for="(item, index) in dataList" :key="index">
                    <div class="col-md-9 pr15">
                        <div class="pt5 font12">
                            <span class="mr15 cl-ccc inline">
                            <v-photos :sourceData="item" /></span>
                            <span class="mr15 cl-ccc">{{item.nickname}}</span>
                        </div>
                    </div>
                    <div class="col-md-2">
                        {{item.times}}
                    </div>
                    <div class="col-md-1">
                        <span @click="handleDelete(item)">删除</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  useStore,
  ref,
  onMounted,
  computed,
  useRoute
} from '@/utils'
import BindUser from './bindUser.vue'

const store = useStore()
const route = useRoute()
const loading = ref(false)
const dataList: any = ref([])

function handleDelete(param: any){
  store.dispatch('common/Fetch', {
    api: "confirmBindUser",
    data: {
      operation: 'remove',
      fid: route.query.id,
      uid: param.uid
    }
  }).then(res => {
    init()
  })
}

function init() {
  store.dispatch('common/Fetch', {
    api: "scheduleBindRoster",
    data: {
      id: route.query.id
    }
  }).then(res => {
    dataList.value = res.result || []
  })
}

onMounted(() => {
    init()
})
</script>

<style lang="less" scoped>
.photos {
  width: 80px;

  img {
    width: 50px;
    height: 50px;
  }
}

.item-thum-wrap {
  .num {
    font-size: 18px;
    font-weight: bold;
    color: #999;
  }

  &:nth-child(1) {
    .num {
      color: #f44f4f;
    }
  }

  &:nth-child(2) {
    .num {
      color: #ff761e;
    }
  }

  &:nth-child(3) {
    .num {
      color: #f1a905;
    }
  }
}
</style>
