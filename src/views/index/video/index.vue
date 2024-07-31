<template>
<div>
  <div class="container w1100">
    <UserInfoHead />
  </div>
  <div class="container w1100 relative clearfix">
    <div class="w180 left">
      <v-aside :data="module.home_nav" :isFixed="false">
        <template v-slot:button>
        </template>
      </v-aside>
    </div>
    <div class="right" style="width: 910px;">
      <div class="module-wrap">
        <div class="module-content p20">
          <div style="height: 165px; overflow: hidden;">
            <div class="mb15 font14">视频({{cateList.length || 0}})
            </div>
            <v-slider @onClick="handleclick" :dataList="cateList" />
          </div>
        </div>
      </div>
      <div class="module-wrap">
        <div class="module-content p20" style="min-height: 500px">
          <div class="plr15">
            <div class="col-md-4 p10" v-for="(item, i) in dataList" :key="i">
              <Video :data="item" :hasName="false" />
            </div>
          </div>
          <v-nodata v-if="dataList.length === 0" trip="暂时没有数据" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  useStore,
  computed,
  onMounted,
  ref,
  codings,
  getUid
} from '@/utils'
import UserInfoHead from '../../home/components/UserInfoHead.vue'
import Video from '../../index/components/TalkItem/components/video2.vue'

const coding: any = codings.talk
const store = useStore();
const dataList: any = ref([])
const cateList: any = ref([])
const module = computed(() => store.getters['user/config_talk']);

function init(param: any = {}) {
  dataList.value = []
  store.dispatch('common/Fetch', {
    api: 'getVideo',
    data: {
      pagesize: 25,
      page: 1,
      category: 'video',
      cid: param.id,
      uid: getUid()
    }
  }).then(res => {
    dataList.value = res.result || []
  })
}

function cate() {
  store.dispatch('common/Fetch', {
    data: {
      coding: coding.cate
    }
  }).then(res => {
    cateList.value = res.result
    init(cateList.value[0])
  })
}

function handleclick(param: any) {
  init(param)
}

onMounted(() => {
  cate()
})
</script>
