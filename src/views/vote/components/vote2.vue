<template>
  <!-- 条形图 -->
  <template v-if="data.chart === '1'">
    <div class="m25 flex" style="height: 64px" v-for="(item, index) in data.list" :key="index">
      <div class="mr10">
        <input type="radio" name="name" :value="item.id" :checked="item.id === data.user_voting.options" :disabled="data.user_voting.times" style="width: 20px; height: 20px;" @click="handleChoose(item.id)" v-if="data.choose === '1'" />
        <input type="checkbox" :value="item.id" :checked="data.user_voting.options.indexOf(item.id) > -1" :disabled="data.user_voting.times" style="width: 20px; height: 20px;" @click="handleChoose(item.id)" v-else />
      </div>
      <div class="mr10">{{item.votetitle}}</div>
      <div class="relative" style=" flex: 1">
        <span class="absolute font12 cl-999" style="top: -20px; left: 0" v-if="item.description">{{item.description}}</span>
        <div class=" h30" style="border-radius: 4px;" :style="{background: item.color}"></div>
      </div>
      <div class="ml15 pb5">{{item.vote}}票</div>
    </div>
  </template>
  <template v-else>
    <div class="mlr15 p25 inline" style="width: 120px; height: 325px" v-for="(item, index) in data.list" :key="index">
      <div class="pb5 h25">{{item.vote}}票</div>
      <div class=" h200 inline" style="border-radius: 4px; width: 64px;" :style="{background: item.color}"></div>
      <div class="h25">{{item.votetitle}}</div>
      <div class="mt10 h25">
        <input type="radio" name="name" :value="item.id" :checked="item.id === data.user_voting.options" :disabled="data.user_voting.times" style="width: 20px; height: 20px;" @click="handleChoose(item.id)" v-if="data.choose === '1'" />
        <input type="checkbox" :value="item.id" :checked="data.user_voting.options.indexOf(item.id) > -1" :disabled="data.user_voting.times" style="width: 20px; height: 20px;" @click="handleChoose(item.id)" v-else />
      </div>
    </div>
  </template>
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
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  emits: ['value'],
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter()
    const checkedList: any = ref([])

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

    function handleChoose(param: any) {

      if (props.data.choose === '0') {
        if (checkedList.value.indexOf(param) > -1) {
          let index = checkedList.value.indexOf(param)
          checkedList.value.splice(index, 1)
        } else {
          checkedList.value.push(param)
        }
        context.emit('value', checkedList)
      }else{
        context.emit('value', param)
      }

    }

    function handleBack() {
      router.push('/vote')
    }

    onMounted(init)
    return {
      init,
      handleBack,
      handleChoose
    }
  }

})
</script>
