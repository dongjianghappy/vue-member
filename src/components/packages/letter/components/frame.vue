<template>
<div class="letter-tabs">
  <div class="tabs-button" id="chats" @mousedown="mousedownsss" :class="className.nav">
    <div class="tabs-list pointer" :class="[{current: currentIndex === index}]" v-for="(item, index) in tabs" :key="index" @click="handleClick(index)">
      <div><i class="iconfont" :class="` icon-${item.icon}`" /></div>
      <div class="user">{{item.name}}</div>
    </div>
    <div v-if="extra" class="pr15" style="flex: 1; text-align: right;">
      <slot name="extra"></slot>
    </div>
  </div>

  <div class="tab-content" :class="className.con">
    <div class="tabsbox" style="display: block; line-height: 30px;">
      <div v-if="currentIndex === 0">
        <slot name="content1"></slot>
      </div>
      <div v-if="currentIndex === 1">
        <slot name="content2"></slot>
      </div>
      <div v-if="currentIndex === 2">
        <slot name="content3"></slot>
      </div>
      <div v-if="currentIndex === 3">
        <slot name="content4"></slot>
      </div>
      <div v-if="currentIndex === 4">
        <slot name="content5"></slot>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRouter,
  onMounted
} from '@/utils'

export default defineComponent({
  name: 'v-Tabs',
  props: {
    className: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      default: ""
    },
    tabs: {
      type: Array,
      default: []
    },
    icon: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "level"
    },
    aaa: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default: () => {
        return {}
      }
    },
    method: {
      type: String,
      default: "route"
    },
    isEmit: {
      type: Boolean,
      default: false
    },
    extra: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:index'],
  setup(props, context) {
    const router = useRouter();
    let currentIndex: any = ref(0)
    let ball: any = ref(null)
    let isDrag: any = ref(false)

    function handleClick(index: any) {
      if (props.isEmit === true) {
        currentIndex.value = index
        context.emit('update:index', index)
      } else {
        if (props.method === 'click') {
          currentIndex.value = index
        } else {
          currentIndex.value = index
          router.push(props.aaa ? `?${props.query.url}&${props.query.name}=${index}` : `?type=${index}`)
        }
      }
    }

    // function mousedownsss(event: any) {
    //    ball = event.currentTarget.parentNode.parentNode.parentNode
    //   debugger
    //     let shiftX = event.clientX - ball.getBoundingClientRect().left;
    //     let shiftY = event.clientY - ball.getBoundingClientRect().top;

    //     ball.style.position = 'absolute';
    //     ball.style.zIndex = 1000;
    //     document.body.append(ball);

    //     moveAt(event.pageX, event.pageY);

    //     // 移动现在位于坐标 (pageX, pageY) 上的球
    //     // 将初始的偏移考虑在内
    //     function moveAt(pageX: any, pageY: any) {
    //         ball.style.left = pageX - shiftX + 'px';
    //         ball.style.top = pageY - shiftY + 'px';
    //     }

    //     function onMouseMove(event: any) {
    //         moveAt(event.pageX, event.pageY);
    //     }

    //     // 在 mousemove 事件上移动球
    //     document.addEventListener('mousemove', onMouseMove);

    //     // 放下球，并移除不需要的处理程序
    //     ball.onmouseup = function () {
    //         document.removeEventListener('mousemove', onMouseMove);
    //         ball.onmouseup = null;
    //     };

    // };

    // ball.ondragstart = function () {
    //     return false;
    // };

    onMounted(() => {
      let el: any = document.getElementById('chats')
      el.addEventListener('mousedown', (ev: any) => {
         let els = ev.currentTarget.parentNode.parentNode.parentNode
        isDrag.value = true
        ev.preventDefault()
        let oevent = ev || event
        let distanceX = oevent.clientX //鼠标点击位置
        let distanceY = oevent.clientY //鼠标点击位置

        document.onmousemove = function (e: any) {

          if (!isDrag.value) {
            return
          }

          els.style.top = e.clientY - ev.layerY + "px"
          els.style.left = e.clientX - ev.layerX + "px"
        }
      })

      el.addEventListener('mouseup', (ev: any) => {
        isDrag.value = false

      })
    })

    return {
      // mousedownsss,
      handleClick,
      currentIndex
    }
  }
})
</script>

<style scoped>
.current {
  color: var(--color-primary) !important;
}
</style>
