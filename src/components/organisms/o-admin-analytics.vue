<template>
	<div class="o-admin-analytics">
		<template v-if="loader > 0">
			<VueApexCharts :key="loader" type="treemap" height="350" :options="chartOptions2" :series="series2" />
			<br><br><br><br>
			<VueApexCharts :key="loader+100" type="bar" height="350" :options="chartOptions" :series="series" />
		</template>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import VueApexCharts from "vue3-apexcharts";

export default {
	components: {
		VueApexCharts
	},
	props: {
		user: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			loader: 0,
	    series: [{
	      name: 'Anunțuri',
	      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
	    }],
	    chartOptions: {
	      chart: {
	        height: 350,
	        fontFamily: 'Raleway, sans-serif'
	      },
	      plotOptions: {
	        bar: {
	          borderRadius: 10,
	          dataLabels: {
	            position: 'top', // top, center, bottom
	          },
	        }
	      },
	      dataLabels: {
	        enabled: true,
	        offsetY: -20,
	        style: {
	          fontSize: '12px',
	          colors: ["#304758"],
	          fontFamily: 'Raleway, sans-serif'
	        }
	      },
	      xaxis: {
	        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	        position: 'top',
	        axisBorder: {
	          show: false
	        },
	        axisTicks: {
	          show: false
	        },
	        crosshairs: {
	          fill: {
	            type: 'gradient',
	            gradient: {
	              colorFrom: '#D8E3F0',
	              colorTo: '#BED1E6',
	              stops: [0, 100],
	              opacityFrom: 0.4,
	              opacityTo: 0.5,
	            }
	          }
	        },
	        tooltip: {
	          enabled: true,
	        }
	      },
	      yaxis: {
	        axisBorder: {
	          show: false
	        },
	        axisTicks: {
	          show: false,
	        },
	        labels: {
	          show: true
	        }
	      },
	      colors: ['#c21b52'],
	      title: {
	        text: 'Anunțuri populare',
	        floating: true,
	        offsetY: 330,
	        align: 'center',
	        style: {
	          color: '#444'
	        }
	      }
	    },
	    series2: [
        {
          data: [
            {
              x: 'New Delhi',
              y: 218
            },
            {
              x: 'Kolkata',
              y: 149
            },
            {
              x: 'Mumbai',
              y: 184
            },
            {
              x: 'Ahmedabad',
              y: 55
            },
            {
              x: 'Bangaluru',
              y: 84
            },
            {
              x: 'Pune',
              y: 31
            },
            {
              x: 'Chennai',
              y: 70
            },
            {
              x: 'Jaipur',
              y: 30
            },
            {
              x: 'Surat',
              y: 44
            },
            {
              x: 'Hyderabad',
              y: 68
            },
            {
              x: 'Lucknow',
              y: 28
            },
            {
              x: 'Indore',
              y: 19
            },
            {
              x: 'Kanpur',
              y: 29
            }
          ]
        }
      ],
      chartOptions2: {
        legend: {
          show: false
        },
        chart: {
          height: 350,
          type: 'treemap',
          fontFamily: 'Raleway, sans-serif'
        },
        title: {
	        text: 'Cele mai căutate anunțuri',
	        floating: true,
	        align: 'center',
	        style: {
	          color: '#444'
	        }
	      },
        colors: ['#c21b52'],
      },
	  }
  },
	mounted () {
		this.fetchStatistics()
	},
	computed: {
		...mapGetters ({
			popularLocations: 'getPopularLocations',
      mostSearchedLocations: 'getMostSearchedLocations'
		}),
	},
	methods: {
		...mapActions ({
			fetchHome: 'fetchHome'
		}),
		async fetchStatistics () {
			await this.fetchHome()
			let locations = []
			this.popularLocations.forEach(item => locations.push(item.city.name))
			this.chartOptions.xaxis.categories = locations

			let counter = []
			this.popularLocations.forEach(item => counter.push(item.announces))
			this.series[0].data = counter

			let mostSearched = []
			this.mostSearchedLocations.forEach(location => mostSearched.push({ x: location.name, y: location.count }))
			this.series2[0].data = mostSearched

			this.loader++
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";


</style>