<template>
<div class="module-wrap">
  <div class="module-head">签到列表</div>
  <div class="module-content p10" style="padding-bottom: 25px !important; height:auto" v-for="(item, index) in dataList.month" :key="index">
    <div class="p10 cl-white">累计签到{{dataList.sign_count}}次，连续签到{{dataList.continuous_sign}}次，{{dataList.signed ? "今天已签到，签到时间"+ dataList.sign_time: "今天未签到，上一次签到时间"+dataList.sign_time}}</div>
    <div class="p10" style="color: #f67f00">{{item.month}}</div>
    <div class="flex p10" style=" border-bottom: 1px solid var(--default-border);" v-for="(list, i) in item.list" :key="i">
      <div style=" flex: 1;">
        {{list.times}}
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['common/signList']);

    function init(param: any) {
      store.dispatch('common/SignList', {
        ...param
      })
    }
    init({})
    return {
      init,
      dataList
    }
  }

})
</script>
