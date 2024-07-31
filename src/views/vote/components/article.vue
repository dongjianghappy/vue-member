<template>
<div class="module-wrap">
  <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 560px">
    <div class="mb15 font18 bold align_center">
      <v-back />
      {{detail.name}}</div>
    <div class="p25" style=" text-indent: 30px; line-height: 25px;">{{detail.content}}</div>
    <div class="p25 align_center">
      <div class="plr25 pb25 align_right" v-if="detail.user_voting && detail.user_voting.times">您在
        <span class="cl-red bold">
          {{detail.user_voting && detail.user_voting.times}}
        </span>
        参与了投票</div>
      <Vote2 :data="detail" @value="(e) => detail.option = e" />
      <div class="mt10">
        <div class="bg-ccc cl-white p15 inline" style="border-radius: 4px; width: 100px;" @click="handelclick">我要投票</div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  useRouter,
  useRoute
} from '@/utils'

import Vote1 from "./vote1.vue"
import Vote2 from "./vote2.vue"

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const route = useRoute()
const detail: any = ref([])

function init() {
  store.dispatch('common/Fetch', {
    api: 'voteDetail',
    data: {
      id: route.query.item
    }
  }).then(res => {
    detail.value = res.result
  })
}

function handelclick(param: any) {
  if (detail.value.user_voting.times) {
    proxy.$hlj.message({
      msg: "亲, 你已经投过票了"
    })
    return
  }
  store.dispatch('common/Fetch', {
    api: "Vote",
    data: {
      id: route.query.item,
      options: typeof detail.value.option === 'string' ? detail.value.option : detail.value.option.join(',')
    }
  }).then(res => {
    param.vote = parseInt(param.vote) + parseInt(res.result.num)
    param.status = true
  })
}

onMounted(init)
</script>
