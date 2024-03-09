<template>
<div class="m25 flex" style="height: 64px" v-for="(item, index) in data.list" :key="index">
  <div class="mr10">
    <input type="radio" name="name" :value="value" v-model="checked" style="width: 20px; height: 20px;" v-if="data.choose === '1'" />
    <input type="checkbox" style="width: 20px; height: 20px;" v-else />
  </div>  
  <div  class="mr10">{{item.votetitle}}</div>
  <div class="relative" style=" flex: 1">
    <span class="absolute font12 cl-999" style="top: -20px; left: 0" v-if="item.description">{{item.description}}</span>
    <div class=" h30" style="border-radius: 4px;" :style="{background: item.color}"></div>
  </div>
  <div class="ml15 pb5">{{item.vote}}票</div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  getUid,
  useRouter
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  props: {
    data: {
      type: Array,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter()
    const dataList: any = ref([{
        name: '百度',
        vote: 120,
        color: '#2dcd97'
      },
      {
        name: '腾讯',
        vote: 125,
        color: '#4b8aff'
      },
      {
        name: '阿里',
        vote: 125,
        color: '#ff6f03'
      }
    ])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'visitorList',
        data: {
          uid: getUid()
        }
      }).then(res => {
        // dataList.value = res.result
      })
    }

    function handleBack() {
      router.push('/vote')
    }

    onMounted(init)
    return {
      dataList,
      init,
      handleBack
    }
  }

})
</script>
