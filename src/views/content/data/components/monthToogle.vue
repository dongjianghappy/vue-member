<template>
<div>
      <span class="plr15 bold">{{title}}</span>
      <span>
        
        <div class="w50" style="display: inline-flex;">
          <i class="iconfont icon-arrow deg180 pointer" title="上一月份" @click="handleToggle(-1)" />
          <i class="iconfont icon-arrow pointer" title="下一月份" @click="handleToggle(1)" />
        </div>
        <!-- <v-condition name="年份" :defaultValue="{value: '2023', name: '2023'}" icon="sort" field="year" :enums="yaerList" :render="init" /> -->
      </span>
    </div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore
} from '@/utils'

const props: any = defineProps({
  title: {
    type: String,
    default: ""
  },
  month: {
    type: String,
    default: ""
  }
})

const emit: any = defineEmits(['toggle'])

function handleToggle(param: any) {
  if((param === -1 && props.month === 1) || (param === 1 && props.month === 12)){
    return
  }
  
  emit('toggle', props.month + param)
}  
</script>
