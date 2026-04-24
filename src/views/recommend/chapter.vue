<template>
    <div class="relative" style="height: -webkit-fill-available;">
        <div class="p25" style="background: var(--card-background); position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; border-radius: 8px; overflow: hidden;" v-if="dataList.list && dataList.list.length">
            <div class="cover">
                <div class="flex pater">
                    <div class="text-content flex p25" style="width: 270px">
                        <div class="title">
                          <div class="line-box">
                          第一章伍乘和钟梓熠
                          </div>  
                        </div>
                        <div class="content">
                          在网页中实现文字的‌垂直居中‌，需根据内容是否为单行、容器是否固定高度等因素选择合适方案。以下是主流且兼容性良好的方法
                        </div>
                        <div class="flag">
                          <div class="flag-out">
                            <div class="flag-in">我的好友</div>
                          </div>
                        </div>
                    </div>
                    <div class="p25" style="flex: 1">
                        <img src="/images/bg2.jpg" style="width: 100%; height: 100%;">
                     </div>
                </div>
            </div>
        </div>
        <div :style="`padding: ${height/2}px`" v-else>
            <v-loding v-if="!loading" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  useStore,
  ref
} from '@/utils'

import Directory from './components/directory.vue'

const store = useStore()
const dataList: any = ref([])
const detail: any = ref({})
const loading: any = ref(false)

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 12
  }

  Object.assign(params, param)
  loading.value.true
  store.dispatch('common/Fetch', {
    api: "bookmark",
    data: {
      type: 'all',
      ...params
    }
  }).then(res => {
    loading.value.false
    dataList.value = res.result
  })
}

function handleCate(param: any){
  store.dispatch('common/Fetch', {
    api: "bookmarkCate",
    data: {
      uid: param.uid
    }
  }).then(res => {
    detail.value = res.result
  })
}

function visit(param: any) {
  window.open(param.url)
}

onMounted(() => {
  init()
})
</script>


<style lang="less" scoped>
.cover{
  background: #161823;
  padding: 10px;
  height: 100%;
  .pater{
    background: #aea97d;
    height: 100%;
    .text-content{
      display: flex;
      .title{
        border: 4px solid #333;
        padding: 2px;
        width: 64px;
        font-size: 30px;
        font-weight: bold;
        writing-mode: inherit;
        text-align: center;
        .line-box{
          border: 2px solid #333;
          height: 100%;
          color: #333;
        }
      }
      .content{
        flex: 1;
        padding-right: 20px;
        writing-mode: vertical-rl;
        line-height: 25px;
        color: #333;
      }
      .flag{
        position: relative;
        width: 30px;
        .flag-out{
          position: absolute;
          left: 15px;
          bottom: 0px;
          border: 1px solid #822103;
          border-radius: 4px;
          padding: 1px;
          height: 70px;
          .flag-in{
            background: #822103;
            writing-mode: vertical-rl;
            border-radius: 4px;
            padding: 5px 0;
            height: 100%;
            color: #999;
          }
        }
      }
    }
  }
}
</style>