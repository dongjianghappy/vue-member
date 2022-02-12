<template>
  <div class="module-wrap">
    <div class="module-head pl25">
      {{data.votetitle}} 投票结束倒计时 14天3小时28分45秒
    </div>
    <div class="module-content p25">
      <div class="mb15">说明: {{data.content}}</div>
      <div>
        <ul style="display: flex">
          <li v-for="(item, index) in data.list"
              :key="index"
              @click="handelclick(item)"
              class="m10 align_center cl-white"
              :class="{voted: item.status}">
            <div class="pt25">{{item.vote}}票</div>
            <div class="pb25">{{item.votetitle}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'v-Search',
  props: {
    data: {
      type: Object,
      defualt: () => {return {}}
    }
  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore();

    function handelclick(param: any){
      store.dispatch('common/Fetch', {
          api: "Vote",
          data: {
            id: param.id,
            choose:  props.data && props.data.choose
          }
      }).then(res => {
        if(res && res.ifSuccess){
          param.vote = parseInt(param.vote)+parseInt(res.result.num)
          param.status = true
        }else{
          proxy.$hlj.message({
            msg: "亲, 你已经投过票了"
          })          
        }      
      })
    }
    return {
      handelclick
    }
  }
})
</script>

<style scoped>
li{
  background:#00bcd4; width: 100px; height: 100px; line-height: 25px; border-radius: 50%;
}
.voted{
  background: #4caf50;
}
</style>