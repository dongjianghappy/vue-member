<template>
<ul class="tab_ul relative">
  <li v-for="(item, index) in (data.length >5 ? data.slice(0, 7) : data)" :key="index" :style="style" :class="{current: (mod.value || '') == item.value}">
    <span @click="handelClick(item.value)">{{item.name}}</span>
    </li>
  <span class="span-icon absolute" style="top: 12px; right: 15px">
    <Popover v-if="data.length > 7" content="<i class='iconfont icon-more icon-btn'></i>" arrow="tb" offset="right" :move="-50" :keys="`popover-more`">
      <div class="p15 align_center" style="width: 70px; height: auto">
        <ul class="font14" style="display: block">
          <li v-for="(item, index) in data.slice(7, data.length)" :key="index" style="width: 100%; height: 32px" @click="handelClick(item.value)">{{item.name}}</li>
        </ul>
      </div>
    </Popover>
  </span>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter,
  ref,
  watch
} from '@/utils'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'TalkTabsView',
  components: {
    Popover
  },
  props: {
    mod: {
      type: Object,
      default: () => {
        return {
          tab: 'mod',
          value: ''
        }
      }
    },
    query: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: []
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
    style: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  setup(props, context) {
    const router = useRouter();

    function handelClick(type: any) {
      let query = type ? `?${props.mod.tab}=${type}` : ""
      router.push(window.location.pathname + query + props.query)
      const param: any = {}

      if (type) {
        param.type = type
      }
      props.render(param)
    }
    return {
      handelClick,
    }
  }
})
</script>
