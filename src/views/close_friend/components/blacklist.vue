<template>
<v-button v-model:show="isShow">
  <span class="cl-999" v-if="data.blacklist">移除黑名单</span>
  <span class="cl-red" v-else>加入黑名单</span>
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" action="edit" title="加入黑名单" :style="{width: 550, height: 250}" :hasfooter="false" api="hasBlack" :data="{...data}">
  <template v-slot:content>
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">加入黑名单</span>
        <span class="right"><v-switch :data="{ item: detail, field: 'status'}" :param="{uid: data.uid}" api="joinBlack" @toggle="getValue" className="right" :auth="true" /></span>
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  watch,
  ref,
  useStore
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const store = useStore();
const dialog: any = ref(null)
const isShow = ref(false)
const detail: any = ref({})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
  }
})

function getValue(param: any){
  detail.value.status = param.value
}
</script>
