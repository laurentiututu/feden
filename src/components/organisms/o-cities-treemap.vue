<template>
  <div>
    <apexchart :options="chartOptions" :series="chartData" type="treemap" />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 0,
                  color: "#ffffff",
                },
              ],
            },
            tooltip: {
              enabled: false,
            },
          },
        },
      },
      chartData: [
        {
          data: [
            {
              x: "Category 1",
              y: 10,
              imageUrl: require('@/assets/announce/house-rules.jpg'),
            },
            {
              x: "Category 2",
              y: 20,
              imageUrl: require('@/assets/announce/house-rules.jpg'),
            },
            // ... other data
          ],
        },
      ],
    };
  },
};
</script>

<style>
.apexcharts-tooltip {
  display: none !important;
}
</style>
