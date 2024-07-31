<template>
<div class="module-wrap">
  <div class="module-head">勋章墙</div>
  <div class="module-content p10" style="padding-bottom: 25px !important; height:auto">
    <v-tabs :tabs="[{name: '已获得',value: 'image'},{name: '记录表达',value: 'talk'},{name: '亲密无间',value: 'photos'},{name: '聊天印记',value: 'picture'}]" :isEmit="true" v-model:index="index">
      <template v-slot:content1>
        <div class="col-md-3 align_center" v-for="(item, index) in dataList" :key="index">
          <div>
            <img :src="item.image" />
          </div>
          {{item.name}}
        </div>
      </template>
      <template v-slot:content2>
        222
      </template>
      <template v-slot:content3>
        333
      </template>
      <template v-slot:content4>
        444
      </template>
    </v-tabs>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  codings,
  onMounted,
  ref,
  useStore
} from '@/utils'

const coding = codings
const store = useStore();
const dataList = ref({});

function init() {
  store.dispatch('common/Fetch', {
    data: {
      coding: coding.medal
    }
  }).then(res => {
    dataList.value = res.result
  })
}

onMounted(init)
</script>
