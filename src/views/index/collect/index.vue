<template>
<div class="home">
  <TalkTabs :getData="init" :style="{flex: 1}" :data="[{name: `我的收藏(共${talkCollect.length}条)`, value: 'collect&item=my'}, {name: '热门收藏', value: 'collect&item=hot'}]" />
  <TalkItem :sourceData="talkCollect" :isLoading="Loading" />
  <div class="con-list" v-if="talkCollect.length === 0 && Loading === false">
    <div class="con-wrap" style=" padding-top:100px; height:350px; text-align: center;">
      <p>你还没有收藏任何作品呢！</p>
      <p style="font-size: 12px; color: #999;">当你发现有意思的、有价值的作品时，赶紧收藏下来哦！</p>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
import TalkTabs from '../components/module/TalkTabs.vue'
import TalkItem from '../components//TalkItem/index.vue'

export default defineComponent({
  name: 'HomeViewsss',
  components: {
    TalkTabs,
    TalkItem
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const Loading: any = ref(false)
    const talkCollect = computed(() => store.getters['talk/talkCollect']);

    function init() {
      store.dispatch('talk/TalkCollect', {

      }).then((res) => {
        Loading.value = true
      })
    }
    init()
    return {
      init,
      Loading,
      talkCollect
    }
  },
})
</script>
