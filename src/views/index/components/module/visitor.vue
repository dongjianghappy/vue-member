<template>
<div class="module-wrap">
  <div class="module-head">
    最近访客
  </div>
  <div class="module-content visit-list plr15 font12">
    <ul class="clearfix">
      <li v-for="(item, index) in visitorList" :key="index">
        <div class="imgbox" style="width: 83px">
          <v-avatar :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%'}" />
          <span class="visit-name font12" style="background: linear-gradient(to top,rgba(0,0,0,.4) 0,rgba(0,0,0,0) 100%); bottom:5px;">{{item.nickname}}</span>
        </div>
        <div class="visit-time">{{item.times}}</div>
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'VisitorView',
  setup(props, context) {
    const store = useStore();
    const visitorList = computed(() => store.getters['common/lastestVisitor']);

    onMounted(() => {
      store.dispatch('common/LastestVisitor')
    })
    return {
      visitorList
    }
  },
})
</script>
