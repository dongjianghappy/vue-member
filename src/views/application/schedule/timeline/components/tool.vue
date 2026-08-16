<template>
<div class="tool-wrap">
  <ul class="flex">
    <li class="integration align_center" @click="handleDefault()">
      默认
    </li>
    <li class="integration align_center" @click="handleClick('date')">
      日期查看
    </li>
    <li class="integration align_center" v-if="data.system === '0'">
      <ChooseUser title="成员查看" @choose="choose" />
    </li>
    <li class="integration align_center">
      <v-timepicker :data="detail" attr="datetime" title="时间查看" :move="-300" :isEmit="true" @onClick="chooseDay" />
    </li>
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
import ChooseUser from './chooseUser.vue'

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

function handleDefault(){
  props.data.title = "全部";
  props.render()
}

function handleClick(){
  props.data.title = "日期";
  props.render({
    timeline: 'date'
  })
}

function chooseDay(param: any){
  let arr = param.split('-')
  props.data.title = param;
  props.render({
    timeline: 'time',
    datetime: param
  })
}

function choose(param: any){
  props.data.title = param.nickname;
  props.render({
    uid: param.uid
  })
}

</script>

<style lang="less" scoped>
.tool-wrap {
  background: var(--module-background);
  border-radius: 50px;
  width: 100%;
  height: 40px;
  li {
    line-height: 40px;
    padding: 0 10px;
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
