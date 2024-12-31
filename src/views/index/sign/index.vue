<template>
<v-button v-model:show="isShow">
  <span style="color: var(--color-primary)"><i class="iconfont icon-feedback font18" />签到</span>
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="" :style="{width: 800, height: 600}" :hasfooter="false">
  <template v-slot:content>
    <v-tabs :tabs="[{name: '每日一签'}, {name: '本月查看'}]" style="">
      <template v-slot:content1>
        <Day />
      </template>
      <template v-slot:content2>
        <Month />
      </template>
    </v-tabs>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  ref
} from '@/utils'

import Day from './day/index.vue'
import Month from './month/index.vue'
const isShow: any = ref(false)
</script>