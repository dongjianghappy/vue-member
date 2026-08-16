<template>
    <v-button v-model:show="isShow">
        选择控件
    </v-button>
    <v-dialog v-model:show="isShow" ref="form" title="表单控件" :style="{width: 550, height: 500}" :confirm="true" @submit="submit">
        <template v-slot:content>
            <div>
                <ul style="height: 300px; overflow: auto;">
                    <li v-for="(item, index) in dataList" :key="index" class="ptb10 flex" @click="handleClick(item)">
                        <div class="nowrap" style="flex: 1"><i class="iconfont icon-dot" /> {{item.remark}}</div>
                        <div class="w80"><i class="iconfont icon-dagou" :class="{'cl-green': item.current}" /></div>
                    </li>
                </ul>
            </div>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  ref,
  useStore,
  watch,
  codings
} from '@/utils'
import QrcodeVue from 'qrcode.vue'
const props: any = defineProps({
  formList: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const emit: any = defineEmits(['onLocaltion'])
const coding = codings.user.schedule.config
const store = useStore()
const isShow = ref(false)
const content: any = ref("")
const dataList: any = ref([])


// 监听弹窗变量
watch([isShow], (newValues, prevValues) => {
  if (isShow.value) {
    handleSearch()
  }
})


function handleClick(param: any) {
  let index = props.formList.findIndex((item: any) => item.id === param.id)
  if(index === -1){
    param.current = true
    props.formList.push({
      id: param.id,
      name: param.remark
    })
  }else{
    param.current = false
    props.formList.splice(index, 1)
  } 
}

function handleSearch() {
  const params: any = {
    coding,
    pagesize: 50
  }

  store.dispatch('common/Fetch', {
    data: {
      ...params
    }
  }).then(res => {
    dataList.value = res.result || []
    dataList.value.map((item: any) => {
      let index = props.formList.findIndex((list: any) => list.id === item.id)
      if(index === -1){
        item.current = false
      }else{
        item.current = true
      } 
    })
  })
}

function submit() {
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
</style>
