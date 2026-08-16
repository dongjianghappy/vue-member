<template>
<div class="module-wrap">
  <div class="module-content p0" style="padding-bottom: 25px !important; min-height: 650px">
    <v-tabs :tabs="[{name: '打卡记录',value: 'photos'},{name: '我的记录',value: 'background'}]" :isEmit="true" v-model:index="index">
      <template v-slot:extra>
        <span @click="handleClick">{{model === 'list' ? '切换日期模式' : '切换列表模式'}}</span>
      </template>
      <template v-slot:content1>

        <List :data="data" :dataList="dataList" v-if="model === 'list'" />
        <Month v-else />
      </template>
      <template v-slot:content2>
        <List :data="data" :dataList="dataList" v-if="model === 'list'" />
        <Month v-else />
      </template>
    </v-tabs>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  useStore,
  ref,
  onMounted,
  computed,
  useRoute,
  useRouter,
  codings,
  getUid
} from '@/utils'
import List from './list.vue'
import Month from '../../calendar/month.vue'
const props: any = defineProps({
  data: {
    type: Array,
    default: () => {
      return {}
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();

const store = useStore()
const route = useRoute()
const router = useRouter();
const coding: any = codings.user.schedule.content
const loading = ref(false)
const dataList: any = ref([])
const model: any = ref("list")

function handleClick(){
  model.value = model.value === 'list' ? 'date' : 'list'
}
</script>

<style lang="less" scoped>
.photos {
  width: 80px;

  img {
    width: 50px;
    height: 50px;
  }
}

.item-thum-wrap {
  .num {
    font-size: 18px;
    font-weight: bold;
    color: #999;
  }

  &:nth-child(1) {
    .num {
      color: #f44f4f;
    }
  }

  &:nth-child(2) {
    .num {
      color: #ff761e;
    }
  }

  &:nth-child(3) {
    .num {
      color: #f1a905;
    }
  }
}
</style>
