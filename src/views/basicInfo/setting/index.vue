<template>
<div class="module-wrap">
  <div class="module-content p15" style="height: 560px;">
    <div class="mb15 font18 bold">设置管理</div>
    <v-collapse :title="item.name" v-for="(item, index) in dataList" :key="index">
      <template v-slot:extra>
      </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, i) in item.list" :key="i">
          <span class="label">
            {{item.remark}}
            {{item.value}}
          </span>
          <v-switch :data="{ item, field: item.name}" api="userSettinng" @toggle="getValue" className="right" :auth="true" />
        </li>
      </ul>
    </v-collapse>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])

    const data: any = ref({
      oldpassword: "",
      password: "",
      surepassword: ""
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: 'settingList',
      }).then(res => {
        dataList.value = res.result
      })
    }

    function getValue(param: any) {
      store.dispatch('user/Detect')
    }

    onMounted(init)
    return {
      data,
      dataList,
      getValue
    }
  }

})
</script>

<style lang="less">
.collapse {
  background: #ddd;

  .collapse-head {
    background: #f8f8fa;
  }

  .collapse-list {
    background: #fff;
  }
}

.form-wrap-box .li .label {
  left: 32px !important;
}
</style>
