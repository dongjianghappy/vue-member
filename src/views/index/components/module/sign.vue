<template>
<div class="module-wrap">
  <div class="module-content sign p0 clearfix">
    <div class="span datetime">
      <i class="week">{{datetime.week}}</i>
      <i class="time">{{datetime.year}}.{{datetime.month}}.{{datetime.day}}</i>
    </div>
    <div class="span sign-button">
      <qiandao />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  useStore,
  ref,
} from '@/utils'
import {
  week
} from '@/assets/const'

import qiandao from './qiandao.vue'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const date = new Date();
const datetime: any = ref({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
  week: week[date.getDay()]
})

function sign() {
  store.dispatch('common/Fetch', {
    api: 'Sign'
  }).then(res => {
    proxy.$hlj.message({
      msg: res.result.msg
    })
  })
}
</script>
