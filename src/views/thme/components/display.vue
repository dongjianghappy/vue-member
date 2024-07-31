<template>
<div class="p10" style="background: #212127; margin-left: 2px; width: 400px">
  <div class="pb10 cl-999">我的主题装扮</div>
  <div style=" height: 330px">
    <v-tabs ref="tabs" :tabs="[{
        name: '主题'
      },{
        name: '特效'
      },{
        name: '挂件'
      },{
        name: '相框'
      },{
        name: '鼠标'
      },{
        name: '样式'
      }]" method="click">
      <template v-slot:content1>
        <div style="height: 160px">
          <div class="col-md-4 p10" v-for="(item, index) in usertheme.theme" :key="index">
            <div class="align_center">
              <div style="height: 80px;">
                <img :src="item.image" style="height: 80px;">
              </div>
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="font12" v-if="usertheme.system_theme == '0'">提示：当前主题为系统设置主题</div>
        <div class="font12" v-if="usertheme.system_theme == '1'">提示：当前主题为用户设置主题</div>
        <div class="font12" v-if="usertheme.system_theme == '2'">提示：当前主题为系统默认主题(主题开关关闭或未设置主题)</div>
      </template>
      <template v-slot:content2>
        <div style="height: 160px">
          <div class="col-md-4 p10" v-for="(item, index) in usertheme.effects" :key="index">
            <div class="align_center">
              <div style="height: 80px;">
                <img :src="item.image" style="height: 80px;">
              </div>
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="font12" v-if="usertheme.system_effects">提示：当前特效为系统设置</div>
      </template>
      <template v-slot:content3>
        <div class="col-md-4 p10" v-for="(item, index) in usertheme.pendant" :key="index">
          <div class="align_center">
            <div style="height: 80px;">
              <img :src="item.src" style="height: 80px;">
            </div>
            {{item.name}}
          </div>
        </div>
      </template>
      <template v-slot:content4>
        <div style="height: 80px;">
          <img :src="usertheme.avatar_pendant.image">
        </div>
        {{usertheme.avatar_pendant.name}}
      </template>
      <template v-slot:content5>
        <div style="height: 80px;">
          <img :src="usertheme.mouse_effects.image">
        </div>
        {{usertheme.mouse_effects.name}}
      </template>
      <template v-slot:content6>
        <div style="height: 80px;">
          <img :src="usertheme.cursor.file">
        </div>
        {{usertheme.cursor.name}}
      </template>
    </v-tabs>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  writeNewStyle
} from '@/utils'

const props: any = defineProps({
  usertheme: {
    type: Object,
    default: () => {
      return {}
    }
  },
  tabIndex: {
    type: Number,
    default: 0
  }
})

const tabs: any = ref(null)

// 监听路由
watch(() => props.tabIndex, (newValues, prevValues) => {
  tabs.value.handleClick(props.tabIndex)
})
</script>
