<template>
  <div class="three-wrap">
    <Head :data="data" />
    <Aside :data="data" v-if="isEdit" />
    <Info :data="data" v-if="isEdit" />
    <Screen :data="data" v-if="!isEdit" />
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  useStore
} from '@/utils'

import Head from '../head/index.vue'
import Aside from '../aside/index.vue'
import Screen from './screen.vue'
// import MoveInfo from './moveInfo.vue'
import Info from '../attributes/index.vue'
import Item from '../aside/item.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const store = useStore()
const isEdit: any = computed(() => store.getters['three/isEdit']);
</script>
