<template>
<div class="module-wrap" >
  <div class="module-head p15 ">
    <h3 class="nobold">下载排行榜</h3>
  </div>
  <div class="module-content p0">
    <ul>
      <li class="item-thum-wrap mb10 " v-for="(item, index) in rankingList" :key="index">
        <div class="item-title relative pl40 pr40 ">
          <i class="iconfont icon-top num m0" v-if="index === 0"></i>
          <span class="num " v-else>{{index}}</span>
          <a :href="`http://www.yunxi10.com/ziyuan/${item.html}`" target="_blank " class=" nowrap p0 ">{{item.title}}</a>
          <span class="absolute cl-ccc " style="top:0 ; right: 0 ">{{item.download}}</span>
        </div>
      </li>

    </ul>
  </div>
  <div class="module-foot"><a href="http://www.yunxi10.com" target="_brank">查看更多</a></div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  computed
} from '@/utils'

export default defineComponent({
  name: 'HomeViewr',
  setup(props, context) {
    const store = useStore();
    const rankingList = computed(() => store.getters['common/ranking']);

    return {
      rankingList
    }
  },
})
</script>
