<template>
<div class="container w1100 relative" style="height: 650px;">
  <div class="p25 align_center">
    <div class="mb25 font24">微博认证体系
      <span class="font16 left" @click="handleBack">
        <i class="iconfont icon-back" />
      </span>
    </div>
    <div>
      <div class="col-md-3 p10">
        <div class="p15 align_center" @click="handleClick('identity')" style=" background: #f9f9f9; border-radius: 8px;">
          <div>
            <div class="mb25 inline" style=" background: #eee; border-radius: 50px; width: 85px; height: 85px; line-height: 105px;">
              <i class="iconfont icon-identity" style="font-size: 36px !important;" />
            </div>
          </div>
          <div>身份认证</div>
          <div class="ptb5 font12">个人用户真实身份确认</div>
        </div>
      </div>
      <div class="col-md-3 p10">
        <div class="p15 align_center" @click="handleClick('interest')" style=" background: #f9f9f9; border-radius: 8px;">
          <div>
            <div class="mb25 inline" style=" background: #eee; border-radius: 50px; width: 85px; height: 85px; line-height: 105px;">
              <i class="iconfont icon-node" style="font-size: 36px !important;" />
            </div>
          </div>
          <div>兴趣认证</div>
          <div class="ptb5 font12"> 垂直领域知名博主认证</div>
        </div>
      </div>
      <div class="col-md-3 p10">
        <div class="p15 align_center" @click="handleClick('questions')" style=" background: #f9f9f9; border-radius: 8px;">
          <div>
            <div class="mb25 inline" style=" background: #eee; border-radius: 50px; width: 85px; height: 85px; line-height: 105px;">
              <i class="iconfont icon-question" style="font-size: 36px !important;" />
            </div>
          </div>
          <div>文章/问答认证</div>
          <div class="ptb5 font12">认证成为文章/问答博主</div>
        </div>
      </div>
      <div class="col-md-3 p10">
        <div class="p15 align_center" @click="handleClick('video')" style=" background: #f9f9f9; border-radius: 8px;">
          <div>
            <div class="mb25 inline" style=" background: #eee; border-radius: 50px; width: 85px; height: 85px; line-height: 105px;">
              <i class="iconfont icon-video" style="font-size: 36px !important;" />
            </div>
          </div>
          <div>视频认证</div>
          <div class="ptb5 font12">认证成为视频博主</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  useRouter
} from '@/utils'

const router = useRouter()

function handleClick(param: any) {
  router.push(`?item=condition&type=${param}`)
}

function handleBack() {
  router.push(`/verified`)
}
</script>
