<template>
  <div class="sidebar aside_nav sidebar_fixed">
    <ul>
      <li v-for="(item, index) in groups"
          :key="index"
          @click="handleclick(item.path)">
        <i class="iconfont"
           :class="[item.icon]"></i> {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance ,computed, useStore, useRouter, onMounted } from '@/utils'

export default defineComponent({
  name: 'AsideView',
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    // const groups = computed(() => store.getters['common/groups']);
    const groups = [{"title":"收藏","path":"?mod=collect","icon":"icon-star"},{"title":"评论","path":"?mod=comment","icon":"icon-comment"},{"title":"点赞","path":"?mod=praise","icon":"icon-like"},{"title":"相册","path":"/album","icon":"icon-img"},{"title":"日志","path":"/journal","icon":"icon-node"},{"title":"留言","path":"/application?mod=feedback","icon":"icon-vote"}]

    
    const loginuser = computed(() => store.getters['common/loginuser']);
    
    function handleclick(param:any){
      router.push(proxy.const.setUrl({
        uid: loginuser.value.account,
        query: param
      }))
    }
    
function init(){
      debugger
      proxy.$scroll.init({
		win: {
			el: window,
			y: 0,
      b:80
		},
		doc: {
			el: 'sidebar_fixed'
		},
		type: "fixed"
	})
    }
    // init({})

    onMounted(init)

    return {
      handleclick,
      groups
    }
  }
})
</script>
