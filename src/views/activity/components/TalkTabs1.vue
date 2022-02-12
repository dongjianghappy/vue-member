<template>
  <div class="tab_ul">
    <ul style="overflow:hidden;">
      <li style="float:left;"
          v-for="(item, index) in tabs"
          :key="index"><span @click="handelClick(item.path)">{{item.name}}</span></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, useRouter } from '@/utils'
export default defineComponent({
  name: 'TalkTabsView',
  props: {
    tabs: {
      type: Array,
      default: ()=>{return []}
    },
    getData: {
      type: Function,
      default: () => {return }
    }
  },

  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const router = useRouter();
    function handelClick(url: any){
      router.push(url)
      props.getData()
    }
    return {
      handelClick
    }
  }
})
</script>
