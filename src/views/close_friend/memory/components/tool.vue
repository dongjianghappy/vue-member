<template>
<div class="tool-wrap">
  <ul class="flex">
    <li class="search-input p5">
      <div class="talk-search">
        <div class="search-box">
          <i class="iconfont icon-search font22"></i>
          <input class="search-boxs" type="text" placeholder="节点搜索" v-model="content" @keypress.enter="handleSearch">

          <div class="relative">
            <span v-if="content" class="absolute pointer" style="top: -4px; right: 45px" @click="handleClear">
              <i class="iconfont icon-close font12" />
            </span>
            <div class="search-button pointer" @click="handleSearch">搜素</div>
          </div>
        </div>
      </div>
    </li>
    <!-- <li>
      <i class="iconfont icon-play" />
    </li>
    <li>
      <i class="iconfont icon-sound" />
    </li> -->
    <li class="integration relative">
      <i class="iconfont icon-node" />
      <Line :data="data" :render="render" />
    </li>
    <li>
      <i class="iconfont icon-download" title="下载" @click="handleDown" />
    </li>

    <!-- <li>
      <i class="iconfont icon-shezhi" @click="handleSetting" />
    </li> -->
  </ul>
  <div class=" mt5 p10 radius-4" style="background-color: var(--input-background) !important;" v-if="content && currentData.length > 1">
    <div class="font12">小贴士：
      查找到{{currentData.length}}个与{{content}}相关节点，可通过左右建进行查看。
      <!-- <span class="mr15" v-for="(item, index) in currentData" :key="index">{{item.name}}</span> -->
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  useStore,
  onMounted
} from '@/utils'

import Line from './line.vue'

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
  },
  position: {
    type: Function,
    default: () => {
      return
    }
  }
})
const emit: any = defineEmits(['setting'])
const store = useStore()
const search: any = ref(false)
const content: any = ref("")
const currentData: any = ref([])
const currentindex: any = ref(0)

function handleDown() {
  const canvas: any = document.getElementById("canvasPictrue");
  let url = canvas.toDataURL("image/png");
  const dom = document.createElement('a')
  dom.href = url
  dom.download = '100.jpg'
  dom.style.display = 'none'
  document.body.appendChild(dom)

  // 触发点击事件
  dom.click()

  // 释放资源
  URL.revokeObjectURL(dom.href)
}

function handleClear() {
  currentData.value = []
  content.value = ""
  findObjectById(props.data, content.value);
}

function findObjectById(data: any, name: any) {
  for (let i = 0; i < data.length; i++) {
    data[i].Highlight = false
    if (data[i].name.indexOf(name) > -1) {
      currentData.value.push(data[i]); // 找到匹配的对象，返回它
    }
    if (data[i].list && data[i].list.length > 0) {
      const foundObject: any = findObjectById(data[i].list, name);
      if (foundObject) {
        currentData.value.push(foundObject); // 在子数组中找到匹配的对象，返回它
      }
    }
  }
  return null; // 没有找到匹配的对象，返回null
}

function handleSearch() {
  currentData.value = []
  if (!content.value) {
    return
  }
  let _search: any = document.getElementsByClassName('search-boxs')
  _search[0].blur()
  findObjectById(props.data, content.value);
  if(currentData.value.length > 0){
    currentData.value[0].Highlight = true
  }
  
}

function handleSetting() {
  emit('setting')
}

onMounted(() => {
    document.addEventListener("keydown", (e: any) => {
      let myElement = document.getElementsByClassName('trackmap-canvas')[0]

    // findObjectById(props.data, content.value);
    if (e.keyCode == '37') {
      if(currentindex.value === 0){
        return
      }
            currentData.value.map((item: any) => {
        item.Highlight = false
      })
      currentindex.value = currentindex.value - 1      
      currentData.value[currentindex.value].Highlight = true
      props.position(currentData.value[currentindex.value].config.x)
      
    }
    if (e.keyCode == '39') {
      
      if(currentindex.value >= currentData.value.length -1){
        return
      }
            currentData.value.map((item: any) => {
        item.Highlight = false
      })
      currentindex.value = currentindex.value + 1
      currentData.value[currentindex.value].Highlight = true
      props.position(currentData.value[currentindex.value].config.x)
    }
  });
})
</script>

<style lang="less" scoped>
.tool-wrap {
  background: var(--module-background);
  border-radius: 50px;
  width: 100%;
  height: 40px;
  li {
    width: 40px;
    line-height: 40px;

    &.search-input {
      width: auto;

      .talk-search {
        display: flex;
        transition: all 0.3s;

        .search-box {
          display: flex;
          flex: 1;
          background: var(--input-background);
          border-radius: 50px;
          height: 30px;
          padding: 0 10px;

          i {
            margin: 0;
            margin-right: 5px;
            padding-top: 5px;
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
    }
  }
}

.integration {
  z-index: 10;

  .integration-wrap {
    background-color: var(--input-background) !important;
    box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.05);
    position: absolute;
    top: 40px !important;
    right: -50px;
    border-radius: 4px;
    padding: 15px;
    width: 150px;
    height: 250px;
    display: none;
    overflow: hidden;
    overflow-y: scroll;
    font-size: 14px;
    text-align: left;
    z-index: 1;

    li {
      height: 30px;
      line-height: 30px;
    }
  }

  &:hover {
    .integration-wrap {
      display: block;
    }
  }
}
</style>
