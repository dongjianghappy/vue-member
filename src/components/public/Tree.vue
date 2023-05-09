<template>
<ul>
  <template v-for="(item, index) in dataList" :key="index">
    <li class="mt10 mb10 relative" style="margin-left: 30px;">
      <span class="absolute deg90" :class="{'deg360': item.extand}" style="left: -35px;" @click="handelExpand(item)" v-if="item.children && item.children.length">
        <i class="iconfont icon-arrow arrow"></i>
      </span>
      <label>
        <input type="checkbox" class="mr15" :checked="checkedList.indexOf(item.key) > -1 ? true : false" @click="handleclick(item.key)" />
        <span v-html="item.title"></span>
      </label>
      <v-tree :dataList="item.children" v-if="item.children" :class="{'extand': item.extand}" :checkedList="checkedList" />
    </li>
  </template>
</ul>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-Tree',
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    checkedList: {
      type: Array,
      default: []
    }
  },
  setup(props, context) {
    function handleclick(id: any) {
      if (props.checkedList.indexOf(id) > -1) {
        let index = props.checkedList.indexOf(id)
        props.checkedList.splice(index, 1)
      } else {
        props.checkedList.push(id)
      }
    }

    function handelExpand(param: any) {
      param.extand = !param.extand
    }
    return {
      handleclick,
      handelExpand,
    }
  }
})
</script>

<style scoped>
.deg360 {
  transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  /* IE 9 */
  -moz-transform: rotate(360deg);
  /* Firefox */
  -webkit-transform: rotate(360deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(360deg);
  /* Opera */
}

.extand {
  display: none;
}
</style>
