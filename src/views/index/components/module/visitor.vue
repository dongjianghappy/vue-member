<template>
<div class="module-wrap">
  <div class="module-head">
    最近访客
  </div>
  <div class="module-content plr15 font12" v-if="visitor.list.length > 0">
    <ul class="visit-list clearfix">
      <li v-for="(item, index) in visitor.list[current]" :key="index">
        <div class="imgbox">
          <img :src="item.photos" onerror="this.src='http://www.yunxi10.com/source/public/images/head_normal_100.png'">
          <span class="visit-name font12" style="background: linear-gradient(to top,rgba(0,0,0,.4) 0,rgba(0,0,0,0) 100%); bottom:0px;">{{item.nickname}}</span>
        </div>
        <div class="ptb10 align_center">{{item.times}}</div>
      </li>
    </ul>
    
    <div>
      <v-space>
        <i class="iconfont icon-arrow deg180" :class="{disabled: current === 0}" style="margin: 8px !important" @click="handleToggle(-1)"></i>
        <i class="iconfont icon-arrow" :class="{disabled: current === 4 || current === visitor.list.length-1}"  style="margin: 8px !important" @click="handleToggle(1)"></i>
        <i class="iconfont icon-more1" @click="handleMore"></i>
      </v-space>
    </div>
  </div>
  <div class="cl-999 p15" v-else>暂无访客</div>
  <div class="module-foot p15 font12 align_left">今日浏览 <span class="mr15">{{visitor.today}}</span>总浏览 <span>{{visitor.total}}</span></div>
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
    const visitor: any = computed(() => store.getters['common/visitor']);
    let current: any = ref(0)

    function handleMore() {
      router.push(`/u/${props.userInfo.account}/content?mod=visitor`)
    }

    function handleToggle(param: any){
      debugger
      if((param === -1 && current.value === 0) || (param === 1 && current.value === 4) || (param === 1 && visitor.value.list.length-1 == current.value)){
        return
      }
      current.value += param
    }

    onMounted(() => {
      store.dispatch('common/LastestVisitor')
    })
    
    return {
      visitor,
      handleToggle,
      current,
      handleMore
    }
  },
})
</script>

<style scoped>
.disabled{
  color: #ccc;
}
</style>