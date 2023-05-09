<template>
<div class="aside-wrap" style="min-height: 650px" v-if="type === 'vertical'">
  <div class="aside-nav" :class="{p0: title}">
    <div v-if="title" class="aside-list align_center" style="border-bottom: 1px solid #eee; height: 63px; line-height: 63px;">
      <h3>{{title}}</h3>
    </div>
    <div class="aside-list pointer" :class="[{plr15: title}, {current: currentIndex === index}]" v-for="(item, index) in tabs" :key="index" @click="handleClick(index)">
      <i class="iconfont" :class="`icon-${icon}`" v-if="icon" />
      {{item.name}}
    </div>
  </div>
  <div class="aside-content">
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
    <div v-if="currentIndex === 5">
      <slot name="content6"></slot>
    </div>
    <div v-if="currentIndex === 6">
      <slot name="content7"></slot>
    </div>
    <div v-if="currentIndex === 7">
      <slot name="content8"></slot>
    </div>
    <div v-if="currentIndex === 8">
      <slot name="content9"></slot>
    </div>
  </div>
</div>
<div class="tabs" v-else>
  <div class="nav-tabs">
    <div class="tabs-list pointer" :class="[{current: currentIndex === index}]" v-for="(item, index) in tabs" :key="index" @click="handleClick(index)">{{item.name}}</div>
    <div v-if="extra" class="pr15" style="flex: 1; text-align: right;">
      <slot name="extra"></slot>
    </div>
  </div>

  <div class="tab-content">
    <div class="tabsbox plr15" style="display: block; line-height: 30px;">
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
} from '@/utils'

export default defineComponent({
  name: 'v-Tabs',
  props: {
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
    },
  },
  emits: ['update:index'],
  setup(props, context) {
    const router = useRouter();
    let currentIndex = ref(0)

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
    return {
      handleClick,
      currentIndex
    }
  }
})
</script>

<style scoped>
.current {
  color: #40a9ff !important;
}
</style>
