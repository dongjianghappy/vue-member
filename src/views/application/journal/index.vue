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
      <Action v-if="query.item === 'details'" :action="query.action" />
      <ArticleView v-else-if="query.item === 'view'" />
      <List :group="userGroup" :query="query" :data="{coding}" :render="init" v-else />
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
import Action from "./article_action.vue"
import ArticleView from "./article_detail.vue"
const coding: any = codings.talk.journal
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
