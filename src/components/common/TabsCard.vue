<template>
<ul class="tab_ul">
  <li v-for="(item, index) in data" :key="index" :style="style"><span @click="handelClick(item.value)">{{item.name}}</span></li>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter
} from '@/utils'

export default defineComponent({
  name: 'TalkTabsView',
  props: {
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
