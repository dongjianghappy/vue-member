<template>
<div class="mt25 mb10">水印位置</div>
<div class="watermark_wrap flex">
  <div class="p15" style="flex: 1">
    <div class="watermark_img relative" :class="{current: position === 'left'}">
      <img src="http://127.0.0.1/user/1101946957/photos/1101946957.png">
      <span class="absolute font12 cl-white" style="left: 10px; bottom: 10px;">@你的昵称</span>  
    </div>
    <div class="watermark-name">
      <span><input id="watermark-left" v-model="position" type="radio" name="watermark" value="left" @click="handleClick('left')" /></span>
      <label for="watermark-left">底部居左</label>
    </div>
  </div>
  <div class="p15" style="flex: 1">
    <div class="watermark_img relative" :class="{current: position === 'center'}">
      <img src="http://127.0.0.1/user/1101946957/photos/1101946957.png">
      <span class="absolute font12 cl-white" style="left: 50%; bottom: 10px; margin-left: -30px;">@你的昵称</span>
    </div>
    <div class="watermark-name">
      <input id="watermark-center" v-model="position" type="radio" name="watermark" value="center" @click="handleClick('center')" />
      <label for="watermark-center">底部居中</label>
    </div>    
  </div>
  <div class="p15" style="flex: 1">
    <div class="watermark_img relative" :class="{current: position === 'right'}">
      <img src="http://127.0.0.1/user/1101946957/photos/1101946957.png">
      <span class="absolute font12 cl-white" style="right: 10px; bottom: 10px;">@你的昵称</span>  
    </div>
    <div class="watermark-name">
      <input id="watermark-right" v-model="position" type="radio" name="watermark" value="right" @click="handleClick('right')" />
      <label for="watermark-right">底部居右</label>
    </div>    
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore
} from '@/utils'
const store = useStore()
let position: any = ref("left")

function handleClick(param: any){
  position.value = param
  store.dispatch('common/Fetch', {
    api: 'watermarkSetting',
    data: {
      position: position.value
    }
  }) 
}

</script>

<style lang="less" scoped>
.watermark_wrap{
  .watermark_img{
    &.current {
      img{
        filter: brightness(1);
      }
    }
    img{
      display: block;
      filter: brightness(0.35);
      width: 100%;
      border-radius: 8px;
    }
  }
  .watermark-name{
    padding: 10px;
    text-align: center;
  }
}
</style>
