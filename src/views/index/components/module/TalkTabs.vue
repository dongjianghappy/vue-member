<template>
<ul class="tab_ul relative">
  <li v-for="(item, index) in (data.length >5 ? data.slice(0, 7) : data)" :key="index" :style="style" :class="{current: (query.value || '') == item.value}">
    <span @click="handelClick(item)">{{item.name}}</span>
  </li>
  <span class="span-icon absolute" style="top: 12px; right: 15px">
    <v-popover v-if="data.length > 7" content="<i class='iconfont icon-more icon-btn'></i>" arrow="tb" offset="right" :move="-50" :keys="`popover-more`">
      <div style="width: 100px; height: auto">
        <ul class="font14" style="display: block">
          <li v-for="(item, index) in data.slice(7, data.length)" :key="index" @click="handelClick(item)">{{item.name}}</li>
        </ul>
      </div>
    </v-popover>
  </span>
</ul>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineExpose,
  useRouter,
  useStore,
  getUid,
  codings
} from '@/utils'
const props: any = defineProps({
  mod: {
    type: Object,
    default: () => {
      return {}
    }
  },
  query: {
    type: Object,
    default: () => {
      return {}
    }
  },
  data: {
    type: Array,
    default: []
  },
  render: {
    type: Function,
    default: () => {
      return
    }
  },
  style: {
    type: Object,
    default: () => {
      return {}
    }
  },
  field: {
    type: String,
    default: "type"
  }
})

defineExpose({handelClick})
const store = useStore()
const router = useRouter();
const coding: any = codings

function handelClick(param: any) {
  let query = ""

  if(param.value === 'huodong'){
    router.push(`/${param.value}`)
    return
  }

  if (props.mod.tab == undefined && param.value) {
    query = `?${props.query.tab}=${param.value}`
  } else {
    if (props.mod.tab) {
      query = `?${props.mod.tab}=${props.mod.value}`
      if (param.value) {
        query += `&${props.query.tab}=${param.value}`
      }
    }

  }

  router.push(window.location.pathname + query)
  const params: any = {}
  if (param.value) {
    params[props.field] = param.value
  }
  props.render(params)
  Archive(params)
}

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
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      ...params
    }
  })
}
</script>
