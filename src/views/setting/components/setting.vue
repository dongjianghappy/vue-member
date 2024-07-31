<template>
<div class="module-wrap">
  <div class="module-content p15" style="min-height: 560px;">
    <div class="mb15 font18 bold">基本设置</div>
    <div v-for="(data, index) in dataList" :key="index" class="mb15 p25" style="background: var(--card-background); border-radius:4px;">
      <div class="mb5">{{data.name}}</div>
      <div v-for="(item, index) in data.list" :key="index" class="mb15 ptb25" style="border-bottom: 1px solid var(--default-border);">
        <div class="flex">
          <div style="flex: 1">
            {{item.remark}}
          </div>
          <div class="align_right" style="width: 80px">
            <span class="p5 font12" v-if="item.text_type === 'select'">
              <v-popover :content="`${list[item[item.name]]}<i class='iconfont icon-triangle font12' />`" arrow="tb" offset="right" :move="-20" :keys="`static111a}`">
                <ul>
                  <li :class="{current: item[item.name]==i}" style="line-height: 30px;" @click="handleClick(item, i)" v-for="(data, i) in list" :key="i">{{data}}</li>
                </ul>
              </v-popover>
            </span>
            <v-switch :data="{ item, field: item.name}" :param="{sub: 'basic'}" api="userSetting" @toggle="getValue" className="right" :auth="true" v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore
} from '@/utils'
import {
  messageNotification
} from '@/assets/const'

const store = useStore();
const dataList: any = ref([])
const list: any = messageNotification

function init() {
  store.dispatch('common/Fetch', {
    api: 'settingList',
    data: {
      sub: 'basic'
    }
  }).then(res => {
    dataList.value = res.result
  })
}

function getValue(param: any) {
  store.dispatch('user/Detect')
}

function handleClick(param: any, value: any) {
  store.dispatch('common/Fetch', {
    api: 'userSetting',
    data: {
      status: param.name,
      value: value,
      sub: 'basic'
    }
  }).then(res => {
    param[param.name] = res.result.value
    store.dispatch('user/Detect')
  })
}

onMounted(init)
</script>
