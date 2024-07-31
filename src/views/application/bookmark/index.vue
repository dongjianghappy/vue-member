<template>
<div>
  <div class="container w1100">
    <UserInfoHead />
  </div>
  <div class="container w1100 clearfix">
    <div class="w180 left">
      <v-aside :data="module.home_nav" :isFixed="false">
        <template v-slot:button>
        </template>
      </v-aside>
    </div>
    <div class="m0 right" style="width: 910px">
      <List :data="{coding: coding}" :group="userGroup" :query="query" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  computed,
  useStore,
  useRoute,
  ref,
  getUid,
  codings
} from '@/utils'
import UserInfoHead from '../../home/components/UserInfoHead.vue'
import List from "./article_list.vue"

const coding: any = codings.talk.favorites
const store = useStore();
const route = useRoute();
let query: any = computed(() => route.query || "");
const userGroup = ref([])
const module = computed(() => store.getters['user/config_talk']);

function init() {
  store.dispatch('common/Fetch', {
    api: "customGroup",
    data: {
      coding: coding.cate,
      uid: getUid()
    }
  }).then(res => {
    userGroup.value = res.result
  })
}

onMounted(() => {
  init()
})
</script>
