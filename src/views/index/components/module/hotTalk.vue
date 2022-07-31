<template>
<div class="module-wrap">
  <div class="module-head">
    热门话题
    <span class="right"><v-refresh :render="refresh" /></span>
  </div>
  <div class="module-content font12">
    <ul>
      <li v-for="(item, index) in hotTalkList[current]" :key="index">
        <div class="item-title relative pl15 pr40 ">
          <a class="ptb10 block" @click="huati(item.name)">{{item.name}}<span class="mark vote" v-if="item.vote !=='0'">票</span></a><span class="absolute cl-ccc " style="top: 10px ; right: 15px ">{{item.num}}</span>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted,
  ref,
  useStore,
  useRouter
} from '@/utils'

export default defineComponent({
  name: 'HomeViewr',
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    let current: any = ref(0)
    const hotTalkList = computed(() => store.getters['common/hotTalk']);

    function init() {
      store.dispatch('common/HotTalk')
    }

    function huati(param: any) {
      router.push(`/activity?item=${param}`)
    }

    function refresh() {
      if (current.value === 4 || current.value === hotTalkList.value.length - 1) {
        current.value = 0
      } else {
        current.value++
      }
    }
    onMounted(init)

    return {
      hotTalkList,
      huati,
      refresh,
      current
    }
  },
})
</script>
