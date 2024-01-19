<template>
  <div>
    <apexchart type="bar" :options="chartOptions" :series="seriesData" />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  props: {
    xValues: {
      type: Array,
      default: () => [],
    },
    yValues: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'bar',
          height: 150,
          fontFamily: 'Raleway, sans-serif'
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          categories: this.xValues,
        },
        yaxis: {
          categories: this.yValues,
          forceNiceScale: true,
          labels: {
            formatter: function (val) {
              return Math.floor(val); // Display only integer values
            }
          }
        },
        colors: ['#c21b52']
      };
    },
    seriesData() {
      return [
        {
          data: this.xValues.map((value, index) => ({
            x: value,
            y: this.yValues[index],
          })),
          name: 'Vizualizări'
        },
      ];
    },
  },
};
</script>

<style>
/* Add any desired styling here */
</style>
