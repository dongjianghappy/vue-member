<template>
<div class="module-wrap">
  <div class="module-head p20">
    下载
  </div>
  <div class="module-content plr15">
    <div class="con-list" v-for="(item, index) in dataList.list" :key="index">
      <div class="con-wrap">
        <div class="photos"><img :src="item.photos" width="30" height="30"></div>
        <div class="user_info pb5"><span class="username">{{item.nickname}}</span></div>
        <div class="user_from pb5">
          {{item.times}}
        </div>
        <div class="user_text">
          <div style="background: #eee; margin-top:5px; padding:5px 10px; font-size: 12px;">下载了：
            <span v-html="item.title"></span>
          </div>
        </div>
      </div>
    </div>
    <v-loding v-if="!loading" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  useStore,
  getUid
} from '@/utils'

const store = useStore();
const dataList: any = ref([])
const loading: any = ref(false)

function init() {
  loading.value = false
  store.dispatch('common/Fetch', {
    api: "getDownload",
    data: {
      uid: getUid(),
      page: 1,
      pagesize: 25,
    }
  }).then(res => {
    loading.value = true
    dataList.value = res.result
  })
}
onMounted(init)
</script>
