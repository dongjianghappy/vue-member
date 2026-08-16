<template>
    <v-button v-model:show="isShow">
        打卡21sdsss
    </v-button>
    <v-dialog v-model:show="isShow" ref="dialog" title="" :data="data" api="talkDetail" :style="{width: 600, height: 500}" :contentStyle="{height: '440px', overflow: 'auto'}" @submit="submit">
        <template v-slot:content>
            <div class="edit-list">
                <div class="li mb15">
                    <span class="label mb10">日程 <i class="iconfont icon-dot" /> {{detail.name}}</span>
                </div>
                <div class="li mb15">
                    <div class="label mb5">日程说明</div>
                    <textarea v-model="detail.content" style="height: 80px" placeholder="请输入日程说明" class="w-full"></textarea>
                </div>
                <div class="li mb15" v-for="(item, index) in formList" :key="index">
                    <div class="label mb5">{{item.remark}}
                        <span v-if="item.unit">({{item.unit}})</span>
                    </div>
                    <input placeholder="请输入" type="text" v-model="detail[item.name]" class="input-sm input-full" v-if="item.text_type === 'input'" />
                    <div v-else-if="item.text_type === 'select'">
                        <v-select :enums="item.enums" v-model:value="detail[item.name]" :defaultValue="'0'" />
                    </div>
                    <div class="flex" v-else-if="item.text_type === 'time'">
                        <div style="flex: 1">
                            <input v-model="detail[item.name]" type="text" placeholder="请输入开始时间" class="input-sm w-full" />
                        </div>
                        <div class="w250 pl10"><v-timepicker :data="detail" :attr="item.name" /></div>
                    </div>
                    <div v-else-if="item.text_type === 'location'">
                        <span class="mr10" v-if="detail[item.name]">{{detail[item.name]}}</span>
                        <v-location @onLocaltion="(e)=>detail[item.name] = e" />
                    </div>
                </div>
            </div>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore,
  provide,
  computed,
  codings
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
})
const store = useStore();
const coding: any = codings.user.schedule.content
const isShow = ref(false)
const formList: any = ref([])
const detail: any = ref({})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    getForm()
  }
})

function getForm(){
    store.dispatch('common/Fetch', {
    api: 'getForm',
    data: {
      id: props.data.id,
    }
  }).then((res) => {
    formList.value = res.result
  })
}

function submit(params: any) {
  const param_extend: any = {}
  for(let i = 0; i < formList.value.length; i++){
    param_extend[formList.value[i].name] = detail.value[formList.value[i].name]
  }

  
  const {
    id,
    content
  } = detail.value

  const param: any = {
    coding,
    id ,
    fid: props.data.id,
    content,
    extension_content: JSON.stringify(param_extend)
  }

  store.dispatch('common/Fetch', {
    api: 'Insert',
    data: {
      ...param,
    }
  }).then(() => {
    isShow.value = false
  })
}
</script>
