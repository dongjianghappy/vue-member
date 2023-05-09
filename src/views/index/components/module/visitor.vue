<template>
<div class="module-wrap">
  <div class="module-head">
    最近访客
  </div>
  <div class="module-content visit-list plr15 font12">
    <ul class="clearfix">
      <li v-for="(item, index) in visitorList" :key="index">
        <div class="imgbox" style="width: 83px">
          <v-photo :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%', display: 'inline-block'}" />
          <span class="visit-name font12" style="background: linear-gradient(to top,rgba(0,0,0,.4) 0,rgba(0,0,0,0) 100%); bottom:0px;">{{item.nickname}}</span>
        </div>
        <div class="visit-time">{{item.times}}</div>
      </li>
    </ul>
  </div>
  <div class="module-foot" @click="handleClick">查看更多</div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRouter,
  computed,
  onMounted
} from '@/utils'

export default defineComponent({
  name: 'VisitorView',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const visitorList = computed(() => store.getters['common/lastestVisitor']);

    function handleClick() {
      router.push(`/u/${props.userInfo.account}/content?mod=visitor`)
    }

    onMounted(() => {
      store.dispatch('common/LastestVisitor')
    })
    return {
      visitorList,
      handleClick
    }
  },
})
</script>
