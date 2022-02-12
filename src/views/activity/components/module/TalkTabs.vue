<template>
  <div class="tab_ul">
    <ul style="overflow:hidden;">
      <li style="float:left;"><span @click="handelClick()">全部</span></li>
      <li style="float:left;"><span @click="handelClick('ori')">原创</span></li>
      <li style="float:left;">
        <span @click="handelClick('img')">
          图片<i class="arrow-icon"></i>
        </span>
      </li>
      <li style="float:left;"><span @click="handelClick('art')">文章</span></li>
      <li style="float:left;"><span @click="handelClick('veo')">视频</span></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, useRouter } from '@/utils'
export default defineComponent({
  name: 'TalkTabsView',
  props: {
    render: {
      type: Function,
      default: () => {return }
    }
  },

  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const router = useRouter();
    function handelClick(type: any){
      let path = location.pathname.split("/")[2]
      let url =  type !== undefined ? `/${path ? "home" : ""}?mod=${type}` : path ? "/home" : "/"
      router.push(url)
      props.render({type})
    }
    return {
      handelClick
    }
  }
})
</script>
