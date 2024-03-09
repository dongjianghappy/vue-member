<template>
<div class="module-wrap">
  <div class="module-head">
    热门话题
    <span class="right">
      <v-refresh :data="hotTalkList" v-model:number="current" size="4" />
      </span>
  </div>
  <div class="module-content">
    <ul>
      <li v-for="(item, index) in hotTalkList[current]" :key="index">
        <div class="item-title relative pl15 pr40 ">
          <a class="ptb10 block" @click="huati(item.name)">{{item.name}}<span class="mark" v-if="item.vote !=='0'">票</span></a><span class="absolute cl-ccc " style="top: 10px ; right: 15px ">{{item.num}}</span>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRouter,
  computed,
  onMounted,
  ref
} from '@/utils'

export default defineComponent({
  name: 'HomeViewr',
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const hotTalkList = computed(() => store.getters['common/hotTalk']);
    let current: any = ref(0)

    function init() {
      store.dispatch('common/HotTalk')
    }

    function huati(param: any) {
      router.push(`/activity?item=${param}`)
    }

    onMounted(init)

    return {
      hotTalkList,
      huati,
      current
    }
  },
})
</script>
