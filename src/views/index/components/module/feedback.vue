<template>
<div class="module-wrap">
  <div class="module-head">
    留言
  </div>
  <div class="module-content">
    <div class="send-input ptb0 p15">
      <div class="send-input-box">
        <textarea placeholder="有什么新鲜事想分享给大家？" class="talkcontent-wrap" style="background: transparent; resize: none;"></textarea>
      </div>
    </div>
    <div class="operate">
      <div class="operate-left">
        
      </div>
      <div class="operate-right">
        <button class="btn" >发送</button>
      </div>
    </div>
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
