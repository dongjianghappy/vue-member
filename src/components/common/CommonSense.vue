<template>
    <div style="position: fixed; right: 0px; bottom: 0px; z-index: 1000000;">
        <div :id="isshow ? 'animation' : 'animation-out'" class="message-wrap">
            <div class="module-wrap">
                <div class="module-head">
                  {{data.prompt_title}}
                  <span class="right pointer" @click="handleClose">关闭</span>
                </div>
                <div class="module-content relative p0" style="height: 150px;">
                  <img :src="data.img[0]" style="width: 100%; height: 150px;">
                  <span class="absolute cl-white pointer" style="bottom: 10px; right: 10px;" @click="handleClick">
                    详情查看
                    <i class="iconfont icon-arrow" style="margin: 0 !important;" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  defineProps,
  useRouter,
  useStore
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const store = useStore()
const router = useRouter();
const userInfo: any = computed(() => store.getters['user/userInfo']);
const isshow: any = ref(false)

function handleClose(){
  isshow.value = false
  sessionStorage.setItem("loginMessage", 'false')
}


function handleClick(){
  isshow.value = false
  sessionStorage.setItem("loginMessage", 'false')
  router.push(`${props.data.path}?id=${props.data.id}`)
}

onMounted(() => {
  isshow.value = true
  setTimeout(() => {
    isshow.value = false
    sessionStorage.setItem("loginMessage", 'false')
  }, 15000)
})
</script>

<style lang="less" scoped>
#animation {
-webkit-animation:bounceInUp 3s .2s ease both;
-moz-animation:bounceInUp 3s .2s ease both;
}
@-webkit-keyframes bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 3000px, 0) scaleY(5);
    transform: translate3d(0, 3000px, 0) scaleY(5);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0) scaleY(0.9);
    transform: translate3d(0, -20px, 0) scaleY(0.9);
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0) scaleY(0.95);
    transform: translate3d(0, 10px, 0) scaleY(0.95);
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0) scaleY(0.985);
    transform: translate3d(0, -5px, 0) scaleY(0.985);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 3000px, 0) scaleY(5);
    transform: translate3d(0, 3000px, 0) scaleY(5);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0) scaleY(0.9);
    transform: translate3d(0, -20px, 0) scaleY(0.9);
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0) scaleY(0.95);
    transform: translate3d(0, 10px, 0) scaleY(0.95);
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0) scaleY(0.985);
    transform: translate3d(0, -5px, 0) scaleY(0.985);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

#animation-out {
-webkit-animation:bounceOutDown 3s .2s ease both;
-moz-animation:bounceOutDown 3s .2s ease both;
}
@-webkit-keyframes bounceOutDown {
  20% {
    -webkit-transform: translate3d(0, 10px, 0) scaleY(0.985);
    transform: translate3d(0, 10px, 0) scaleY(0.985);
  }

  40%,
  45% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0) scaleY(0.9);
    transform: translate3d(0, -20px, 0) scaleY(0.9);
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 2000px, 0) scaleY(3);
    transform: translate3d(0, 2000px, 0) scaleY(3);
  }
}
@keyframes bounceOutDown {
  20% {
    -webkit-transform: translate3d(0, 10px, 0) scaleY(0.985);
    transform: translate3d(0, 10px, 0) scaleY(0.985);
  }

  40%,
  45% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0) scaleY(0.9);
    transform: translate3d(0, -20px, 0) scaleY(0.9);
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 2000px, 0) scaleY(3);
    transform: translate3d(0, 2000px, 0) scaleY(3);
  }
}
</style>