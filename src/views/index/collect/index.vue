<template>
<div class="home">
  <TalkTabs :style="{flex: 1}" :mod="{tab: 'mod', value: 'collect'}" :data="[{name: '我的收藏', value: ''}, {name: '内容收藏', value: 'content'}]" :query="{tab: 'item', value: route.query.item}" />
  <ContentCollect :sourceData="talkCollect" :loading="Loading" v-if="route.query.item === 'content'" />
  <Collect :sourceData="talkCollect" v-else />
</div>
</template>

<script setup lang="ts">
import {
  useRoute
} from '@/utils'
import TalkTabs from '../components/module/TalkTabs.vue'
import Collect from './components/collect.vue'
import ContentCollect from './components/contentCollect.vue'

const route = useRoute()
</script>
