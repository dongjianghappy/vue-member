<template>
<ul class="tab_ul relative">
  <li v-for="(item, index) in (data.length >5 ? data.slice(0, 7) : data)" :key="index" :style="style" :class="{current: !route.query.item && index == 0 || route.query.item == item.value}">
    <span @click="handelClick(item.value)">{{item.name}}</span>
  </li>
</ul>
</template>

<script setup lang="ts">
import {
  defineProps,
  useRouter,
  useRoute
} from '@/utils'

const props: any = defineProps({
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
  }
})
const route: any = useRoute();
const router: any = useRouter();

function handelClick(type: any) {
  if (route.query.mod) {
    router.push(`${window.location.pathname}?mod=${route.query.mod}&item=${type}`)
  } else {
    router.push(`${window.location.pathname}?item=${type}`)
  }
  props.render({
    fid: route.query.mod,
    item: type
  })
}
</script>
