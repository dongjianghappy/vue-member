<template>
<div class="music-left">
  <!-- {{data.currentMusic}} -->
  <div id="move-music" class="music-name">音乐盒</div>
  <div class="list nowrap" v-for="(item, index) in data.list" :key="index" :class="{'current': data.currentMusic.id === item.id}" :title="item.music_name" @click.stop="handleClick(item, index)">
    <i class="iconfont icon-music" :class="{'current': data.currentMusic.id === item.id}" />
    {{item.music_name}}
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  useStore
} from '@/utils'
import {
  move
} from '@/utils/fn'
import {
  currentMusic
} from '../fn'

const props: any = defineProps({
  data: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const emit: any = defineEmits(['choose'])
const store = useStore()

function handleClick(param: any, index: any) {
  currentMusic(param, props.data.setting, store)
  emit('choose')
}
</script>
