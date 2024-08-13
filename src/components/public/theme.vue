<template>
<div id="theme-album" class="p10 radius-4" style="background: rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 60px;
    right: 5px;
    z-index: 100;
 width: 126px; height: auto"  v-show="userSetting && userSetting.theme && userSetting.theme.theme_album == '1'">
  <div class="ptb10 align_center font12 cl-eee" @click="handleTime" v-if="userInfo.theme && userInfo.theme.theme.length>1">
    <span v-if="playStatus">{{index}} 秒后主题切换</span>
    <span v-else>自动轮播</span>
  </div>
  <div class="theme-item" :class="{current: currentTheme == i }" v-for="(item, i) in userInfo.theme && userInfo.theme.theme" :key="i">
    <img :src="item.image" @click="handleClick(item, i)" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  useStore,
  useRouter,
  onMounted,
  computed,
  ref,
  onBeforeRouteUpdate,
  getUid,
  writeNewStyle,
  useRoute
} from '@/utils'

const props: any = defineProps({
  disabled: {
    type: Boolean,
    default: true
  },
  buttonType: {
    type: String,
    default: "text"
  },
  show: {
    type: Boolean,
    default: false
  }
})

const store = useStore();
const userInfo = computed(() => {
  let login = store.getters['user/loginuser']
  let baisc = store.getters['user/userInfo']
  let info = baisc
  if(login.currentUser){
    info = login
  }
  return info
});
const userSetting = computed(() => store.getters['user/userSetting']);
const timer: any = ref(null)
const currentTheme: any = ref(0)
const index: any = ref(15)
const playStatus: any = ref(true)

function handleClick(param: any, i: any) {
  index.value = 15
  currentTheme.value = i
  writeNewStyle(param)
}

function handleTime(){
  playStatus.value = !playStatus.value
  if(!playStatus.value){
    clearInterval(timer.value)
  }else{
    times()
  }
}

function times() {
  
  timer.value = setInterval(() => {
    if(!userInfo.value.theme){
      clearInterval(timer.value)
      return
    }    
    if (index.value == 0) {
      index.value = 15;
      if (currentTheme.value == userInfo.value.theme.theme.length - 1) {
        currentTheme.value = 0
      } else {
        currentTheme.value++
      }
      writeNewStyle(userInfo.value.theme.theme[currentTheme.value])
    } else {
      index.value--
    }
  }, 1000)
}

onMounted(() => {
  times()
})
</script>

<style lang="less" scoped>
.theme-item {
  margin: 2px 0;
  border-radius: 4px;
  border: 3px solid transparent;
  width: 106px;
  height: 86px;
  &:hover{
    border: 3px solid  var(--color-primary-background);;
  }
  &.current {
    img{
      filter: brightness(1);
    }
  }
  img{
    display: block;
    filter: brightness(0.35);
    width: 100px; height: 80px;
  }
}
</style>
