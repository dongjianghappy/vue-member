<template>
<div class="module-wrap">
  <div class="module-content p0 clearfix">
    <v-calendar @changeMonth="changeMonth" @changeDay="changeDay" :chooseStatus="true">
      <template v-slot:default="row">
        <template v-for="(item, index) in archive" :key="index">
          <i class="iconfont icon-dot cl-red" style="position: absolute; top: -1px; right: 1px;" v-if="item.date == `${row.item.fullYear}-${row.item.month}-${row.item.day}`" />
        </template>
      </template>
    </v-calendar>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  useStore,
  useRoute,
  computed,
  getUid,
  codings
} from '@/utils'

const props: any = defineProps({
  render: {
    type: Function,
    default: () => {
      return
    }
  }
})
const store = useStore();
const route = useRoute();
const coding = codings
const archive: any = computed(() => store.getters['talk/archive']);

// 时间归档
function Archive(param: any) {
  let params: any = {}
  let module_arr = ['talk', 'source', 'article', 'picture', 'tech', 'funny', 'notes', 'questions', 'website', "words"]
  let date: any = new Date()
  if (module_arr.indexOf(param.type) > -1) {
    params.coding = coding[param.type].art
  }

  store.dispatch(`talk/Archive`, {
    data: {
      uid: getUid(),
      type: 'archive',
      year: param.year,
      month: param.month,
      ...params
    }
  })
}

function changeMonth(data: any) {
  Archive({
    type: route.query.mod || '',
    year: data.fullYear,
    month: data.month
  })
  // props.render({
  //   type: route.query.mod || 'talk',
  //   year: data.fullYear,
  //   month: data.month
  // })
}

function changeDay(data: any) {
  props.render({
    type: route.query.mod || '',
    year: data.fullYear,
    month: data.month,
    day: data.day
  })
}
</script>
