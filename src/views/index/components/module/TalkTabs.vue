<template>
<ul class="tab_ul">
  <li><span @click="handelClick()">全部</span></li>
  <li><span @click="handelClick('ori')">原创</span></li>
  <li>
    <span @click="handelClick('img')">
      图片<i class="arrow-icon"></i>
    </span>
  </li>
  <li><span @click="handelClick('art')">文章</span></li>
  <li><span @click="handelClick('veo')">视频</span></li>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useRouter
} from '@/utils'

export default defineComponent({
  name: 'TalkTabsView',
  props: {
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },

  setup(props, context) {
    const router = useRouter();

    function handelClick(type: any) {
      let query = type !== undefined ? `?mod=${type}` : ""
      router.push(window.location.pathname + query)
      props.render({
        type
      })
    }
    return {
      handelClick
    }
  }
})
</script>
