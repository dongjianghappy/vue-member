<template>
<i class="iconfont listen m0" :class="`icon-${data.music_id === musicLists.currentMusic.id ? 'audio cl-primary' : 'listen'}`" @click="handlePlay"></i>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'
import {
  musicPush,
  currentMusic
} from '../packages/music/fn'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const store = useStore()
const musicLists: any = computed(() => store.getters['user/music']);

function handlePlay() {
  const {
    data
  }: any = props
  let music = [{
    ...data
  }]

  const { list, setting } = musicLists.value

  musicPush(music, list)
  store.commit('user/setMusicList', list)
  let index = list.findIndex((list: any) => list.id === music[0].music_id)
  currentMusic(list[index], setting, store)
}
</script>
