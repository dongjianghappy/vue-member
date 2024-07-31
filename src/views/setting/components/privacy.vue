<template>
<div class="module-wrap">
  <div class="module-content p15" style="min-height: 560px;">
    <div class="mb15 font18 bold">隐私设置</div>
    <div v-for="(data, index) in dataList" :key="index" class="mb15 p25" style="background: var(--card-background); border-radius: 4px;">
      <div class="mb5">{{data.name}}</div>
      <div v-for="(item, index) in data.list" :key="index" class="mb15 ptb25" style="border-bottom: 1px solid var(--default-border);">
        <div class="mb5">{{item.remark}}</div>
        <div class="flex">
          <div style="flex: 1">
            {{item.description}}
          </div>
          <div class="align_right" style="width: 80px">
            <span class="p5 font12" v-if="item.text_type === 'select'">
              <v-popover :content="`${getEnum(item.name)[item[item.name]] || getEnum(item.name)[0]}<i class='iconfont icon-triangle font12' />`" arrow="tb" offset="right" :move="-20" :keys="`static111a}`">
                <ul>
                  <li :class="{current: item[item.name]==i}" style="line-height: 30px;" @click="handleClick(item, i)" v-for="(data, i) in getEnum(item.name)" :key="i">{{data}}</li>
                </ul>
              </v-popover>
            </span>
            <v-switch :data="{ item, field: item.name}" :param="{sub: 'privacy'}" api="userSetting" @toggle="getValue" className="right" :auth="true" v-else />
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
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
import {
  visibleTimeRange,
  online,
  commentUser
} from '@/assets/const'

const store = useStore();
const dataList: any = ref([])

function init() {
  store.dispatch('common/Fetch', {
    api: 'settingList',
    data: {
      sub: 'privacy'
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
      sub: 'privacy'
    }
  }).then(res => {
    param[param.name] = res.result.value
    store.dispatch('user/Detect')
  })
}

function getEnum(param: any) {
  let enums: any = []
  if (param === 'visible_time') {
    enums = visibleTimeRange
  } else if (param === 'online') {
    enums = online
  } else if (param === 'comment_user') {
    enums = commentUser
  }
  return enums
}

onMounted(init)
</script>
