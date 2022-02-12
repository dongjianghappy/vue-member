<template>
  <footer>
    <div class="container w1200 ptb20">
      <img src="@/assets/image/logo.png"
           height="50"
           style="filter: grayscale(100%); opacity:0.5;">
    </div>
    <div class="bg-f2f2f5">
      <div class="container w1200 ptb20">
        <div class="mb10">
          <a href="/about.html"
             rel="nofollow">关于我们</a>
          <a href="/contact.html"
             rel="nofollow">联系我们</a>
          <a href="/index/common?mod=feedback"
             target="_blank">意见反馈</a>
          <a href="/index/common?mod=online_message"
             target="_blank">在线留言</a>
        </div>
        <div>CopyRight © 2018 07素材网 粤ICP备18013358号</div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@/utils'

export default defineComponent({
  name: 'v-Footer'
})
</script>
