<template>
<div class="module-wrap">
  <div class="module-head p15 ">
    搜索发现
    <span class="right">
      <v-refresh :data="rankingList" v-model:number="current" size="4" />
    </span>
  </div>
  <div class="module-content p0 font12">
    <ul>
      <li class="col-md-6 item-thum-wrap mb10 " v-for="(item, index) in rankingList" :key="index">
        <div class="item-title ">
          <a :href="`http://www.yunxi10.com/ziyuan/${item.html}`" target="_blank " class=" nowrap p0 ">{{item.title}}</a>
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
  computed,
  ref
} from '@/utils'

export default defineComponent({
  name: 'HomeViewr',
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const rankingList = computed(() => store.getters['common/ranking']);
    let current: any = ref(0)

    return {
      rankingList,
      current
    }
  },
})
</script>
