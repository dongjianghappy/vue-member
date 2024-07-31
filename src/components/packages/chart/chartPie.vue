<template>
<div class="graph">
  <div>
    <chartist ratio="ct-major-second" type="Pie" :data="chartData" :options="options" :responsive-options="responsiveOptions">
    </chartist>
  </div>
  <div className="graph-bar">
    <div className="bar-title">
      <div v-for="(item, index) in chartOptions.title" :key="index">
        {{item}}
        <span style="background: #f00" v-if="chartOptions.title.length > 1"></span>

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
          type: "pie",
          color: "#fff"
        }
      }
    }
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();

    const options = {
      labelInterpolationFnc: function (value: any) {
        return value[0]
      }
    };

    const responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value: any) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 60,
        chartPadding: 20,
      }]
    ];

    return {
      options,
      responsiveOptions
    }
  }
})
</script>
