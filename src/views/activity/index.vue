<template>
<div class="container w1100">
  <Article v-if="query.item" />
  <List v-else :item="query.item" />
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
import Article from "./article.vue"

const router = useRouter();
const route = useRoute();
const store = useStore();
let query: any = computed(() => route.query || "");

function handleclick(param: any) {
  router.push(`/appstore/?mod=${route.query.mod}&action=edit`)
}
</script>
