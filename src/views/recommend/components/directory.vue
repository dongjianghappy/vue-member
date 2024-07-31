<template>
<div class="talk-search">
  <div class="search-box">
    <i class="iconfont icon-search"></i>
    <input type="text" placeholder="书签检索" v-model="content" @keypress.enter="handleSearch">
  </div>
</div>
<div class="navigation" v-if="data.list">
  <div class="navigation-title">{{data.nickname}}的书签分类 ({{data.list && data.list.length}}) 个</div>
  <div class="navigation-container">
    <div class="navigation-list" v-for="(item, index) in data.list" :key="index" @click="handleClick(item)">{{item.name}}</div>
  </div>
</div>
<div class="mt25 pl10 cl-eb7350 pointer" @click="handleClick('')" v-if="data.list || content">还原默认</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  ref
} from '@/utils'
import VueEvent from '@/utils/event'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  render: {
    type: Function,
    default: () => {
      return 
    }
  }
})

const content: any = ref("")
function handleSearch(key: any) {

  // 如果是字符串类型，标识点选搜索
  if (typeof (key) === 'string') {
    content.value = key
  }
  
  props.render({
    word: content.value
  })
}

function handleClick(param: any){
  if(!param){
    content.value = ""
    props.data.list = null
  }
  props.render({
    fid: param.id
  })
}

</script>

<style lang="less" scoped>
.talk-search {
  display: flex;

  .search-box {
    display: flex;
    flex: 1;
    background: var(--input-background);
    border-radius: 50px;
    height: 34px;
    padding: 0 10px;

    i {
      margin: 0;
      margin-right: 5px;
      padding-top: 7px;
      width: 25px;
      font-size: 22px;
    }

    input {
      background: none;
      max-width: 100%;
      border: 0;
      border-radius: 0;
      padding: 0;
      font-size: 14px;
    }
  }

  .search-button {
    width: 50px;
    line-height: 34px;
    text-align: center;
  }
}

.search-wrap {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: var(--module-background);
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  width: 100%;
  height: auto;

  .label {
    .word {
      display: inline-block;
      border-radius: 4px;
      line-height: 16px;
      height: 25px;
      padding: 5px 10px;
      background: var(--label-background);
      margin-right: 10px;
      margin-bottom: 10px;
      color: #999;

      &:hover {
        background: var(--link-hover-background);
      }
    }
  }
}

.navigation {
  margin-top: 25px;
  width: 250px;

  .navigation-title {
    padding: 10px;
    font-weight: bold;
  }

  .navigation-list {
    padding: 8px 10px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s;

    &:hover {
      color: #087ea4;
    }
  }

  .current-navigation {
    background: #e6f7ff;
    border-radius: 4px;
    // font-weight: bold;
    color: #087ea4;
  }
}
</style>
