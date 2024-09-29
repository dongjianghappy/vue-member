<template>
<div class="container w1100">
  <CanvasPicture v-if="query.id" />
  <List v-else />
</div>
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRouter,
  useRoute
} from '@/utils'
import List from "./list.vue"
import CanvasPicture from "./canvasPicture.vue"

const router = useRouter();
const route = useRoute();
const store = useStore();
let query: any = computed(() => route.query || "");

function handleclick(param: any) {
  router.push(`/appstore/?mod=${route.query.mod}&action=edit`)
}
</script>
