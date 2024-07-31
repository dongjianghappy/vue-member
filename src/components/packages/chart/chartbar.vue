<template>
<div class="graph">
  <div :style="`height: ${chartOptions.height}px; background: ${chartOptions.background}`">
    <chartist ratio="ct-major-second" type="Bar" :data="chartData" :options="chartOptions" :responsive-options="chartResponsiveOptions">
    </chartist>
  </div>
  <div className="graph-bar">
    <div className="bar-title">
      <div v-for="(item, index) in chartOptions.title" :key="index">
        {{item}}
        <span :class="`chart-bg-${index+1}`" v-if="chartOptions.title.length > 1"></span>
      </div>

    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          series: []
        }
      }
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {
          height: 600,
          title: [],
          lineSmooth: true,
          type: "Bar",
          color: "#fff"
        }
      }
    }
  }
})
</script>

<style>
.ct-series-b .ct-bar, .ct-series-b .ct-line, .ct-series-b .ct-point, .ct-series-b .ct-slice-donut {
    stroke: #5470c6;
}
.ct-series-c .ct-bar, .ct-series-c .ct-line, .ct-series-c .ct-point, .ct-series-c .ct-slice-donut {
    stroke: #4ea852;
}
.chart-bg-1{
  background: #d70206 !important;
}
.chart-bg-2{
  background: #5470c6 !important;
}
.chart-bg-3{
  background: #4ea852 !important;
}
</style>