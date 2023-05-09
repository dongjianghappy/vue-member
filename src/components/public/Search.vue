<template>
<span class="relative">
  <div class="search absolute" style="right: 10px">
    <div class="searchinput" style="line-height: 30px;">
      <input type="text" :placeholder="placeholder" v-model="content" @keypress.enter="search" style="margin-right: 28px; width: 170px">
      <span v-if="content" class="close absolute pointer" style="top: 0;
    right: 40px;
    bottom: 0;
    padding-top: 0;" @click="handleClear">
        <i class="iconfont icon-close font12" />
      </span>
    </div>
    <div class="searchbtn" style="padding: 1px; line-height: 30px;">
      <a style="padding:0px" @click="search"><i class="iconfont icon-search"></i></a>
    </div>
  </div>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  props: {
    field: {
      type: String,
      default: "title"
    },
    placeholder: {
      type: String,
      default: "内容搜索"
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  setup(props, context) {
    const isSearch: any = ref(false)
    const content: any = ref("")

    function search() {
      const aaaa: any = {}
      aaaa[props.field] = content.value
      props.render({
        ...aaaa
      })
    }

    function handleClear() {
      content.value = ""
    }
    return {
      search,
      isSearch,
      content,
      handleClear
    }
  }
})
</script>
