<template>
<div class="module-wrap mb15 operation_wrap">
  <div class="module-content" v-if="dataList.list">
    <div class="row clearfix">
      <table class="table-striped table-hover col-left-1">
        <tr class="th">
          <td class="col-md-6">名称</td>
          <td class="col-md-2">分类</td>
          <td class="col-md-1">试听</td>
          <td class="col-md-1">时长</td>
          <td class="col-md-1">大小</td>
          <td class="col-md-1">格式</td>
        </tr>
        <tr v-for="(item, index) in dataList.list" :key="index">
          <td>
            {{item.title}}
          </td>
          <td>

          </td>
          <td>
            <v-audio :data="{...item, index, number: dataList.list.length}" />
          </td>
          <td> {{durationTrans(item.duration)}}</td>
          <td> {{`${(item.size / 1024 / 1024).toFixed(3)}MB`}}</td>
          <td> {{item.format}}</td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'

const props: any = defineProps({
  dataList: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
