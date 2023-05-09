<template>
<div class="module-wrap">
  <div class="module-head">
    推荐用户
  </div>
  <div class="module-content plr15 font12">
    <div class="media-wrap mb10 pb10" v-for="(item, index) in dataList" :key="index" style="display: flex">
      <div class="media-left">
        <v-photo :data="item" :style="{width: '50px',  height: '50px', borderRadius: '50%'}" />
      </div>
      <div class="media-body" style="flex: 1">
        <div class="pb5">
          {{item.nickname}}
        </div>
        <div>{{item.signature}}</div>
      </div>
      <div style="width: 70px">
        <v-concernbutton :data="item" :render="init" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  useStore,
} from '@/utils'

export default defineComponent({
  name: 'RecommendUserView',
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['common/recommendUser']);

    function init() {
      store.dispatch('common/RecommendUser')
    }

    onMounted(init)
    return {
      dataList,
      init
    }
  },
})
</script>
