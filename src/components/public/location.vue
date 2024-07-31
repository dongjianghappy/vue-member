<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-position font12">所在位置</i>
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="所在位置" :style="{width: 450, height: 550}" :confirm="true" @submit="submit">
  <template v-slot:content>
    <div>
      <div class="talk-search">
        <div class="search-box">
          <i class="iconfont icon-search"></i>
          <input type="text" placeholder="当前定位输入或检索" class="w-full" v-model="content" @input.enter="handleSearch">
          <!-- <div class="relative">
      <span v-if="content" class="absolute pointer" style="top: 12px; right: 45px" @click="handleClear">
        <i class="iconfont icon-close font12" />
      </span>
      <div class="search-button pointer" v-if="content" @click="handleSearch">搜素</div>
    </div> -->

        </div>
      </div>
      <ul>
        <li class="ptb10 flex" v-if="content && !address.length" @click="handleClick(content)">
          <div class="nowrap" style="flex: 1"><i class="iconfont icon-position" /> {{content}}</div>
          <div class="w80"><i class="iconfont icon-dagou" :class="{'cl-green': currentLocation == content}" /></div>
        </li>
        <li v-for="(item, index) in dataList" :key="index" class="ptb10 flex" @click="handleClick(item.address)">
          <div class="nowrap" style="flex: 1"><i class="iconfont icon-position" /> {{item.address}}</div>
          <div class="w80"><i class="iconfont icon-dagou" :class="{'cl-green': currentLocation == item.address}" /></div>
        </li>
      </ul>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  codings,
  defineProps,
  computed,
  ref,
  useStore
} from '@/utils'
import QrcodeVue from 'qrcode.vue'
const props: any = defineProps({
  user: {
    type: String,
    default: ""
  }
})
const emit: any = defineEmits(['onLocaltion'])
const store = useStore()
const coding = codings.location
const isShow = ref(false)
const content: any = ref("")
const currentLocation: any = ref("")
const dataList: any = ref([])
const address = computed(() => {
  let arr = dataList.value.filter((item: any)=>item.address === content.value)
  return arr
});

function handleClick(param: any) {
  currentLocation.value = param
}

function handleSearch() {
  const params: any = {
    page: 1,
    pagesize: 50
  }

  if(!content.value){
    dataList.value = []
    return
  }

  store.dispatch('common/Fetch', {
    api: "getLocation",
    data: {
      word: content.value,
      ...params
    }
  }).then(res => {
    dataList.value = res.result || []
  })
}

function submit() {
  emit('onLocaltion', currentLocation.value)
  isShow.value = false
}
</script>

<style scoped>
.li {
  background: #ccc;
  height: 75px;
  border-radius: 5px;
  line-height: 75px;
  color: #fff;
}

.current {
  background: #8bc34a;
}
</style><style lang="less" scoped>
.talk-search {
  display: flex;
  margin-bottom: 25px;
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
