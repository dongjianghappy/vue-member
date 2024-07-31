<template>
<div class="module-wrap">
  <div class="module-head p20">
    点赞
  </div>
  <div class="module-content">
    <div class="con-list" v-for="(item, index) in talkPraise" :key="index">
      <div class="con-wrap">
        <span class="infos demoimg" data-placement="top" data-toggle="tooltip" data-position="30px" style="position:absolute; top:25px; right:15px;"><i class="iconfont icon-down"></i></span>

        <div class="photos"><a href="//home"><img :src="item.photos" width="30" height="30"></a></div>
        <div class="user_info pb5"><span class="username">{{item.nickname}}</span></div>
        <div class="user_from pb5">
          {{item.times}}
        </div>
        <div class="user_text">

          <div style="background: #eee; margin-top:5px; padding:5px 10px; font-size: 12px;">攒了的微博：
            <span v-html="item.summary"></span>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  getUid,
  onMounted,
  useStore
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const store = useStore();
const coding: any = props.data.coding
const dataList: any = ref([]);
const loading: any = ref(false)

function init() {
  loading.value = false
  store.dispatch('common/Fetch', {
    api: "getPraise",
    data: {
      uid: getUid(),
      coding: coding.art,
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
