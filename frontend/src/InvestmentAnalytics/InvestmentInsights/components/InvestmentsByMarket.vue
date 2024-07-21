<template>
  <v-card class="pa-4 elevation-4">
    <v-card-title>
      Investments by Market
    </v-card-title>
    <v-card-text>
      <p class="mb-2">Only the investments with known market</p>
      <Bar v-if="chartData" :data="chartData" height="50px"/>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { fetchInvestmentsByMarket } from '../../composables/useInvestmentAnalyticsData'
import type { GraphData } from "@/types"

interface MarketDistribution {
    market: string,
    count: number
}

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

const chartData: Ref<null | GraphData> = ref(null)


onMounted(async () => {
  const { data } = await fetchInvestmentsByMarket()
  
  const labels = data.map((item: MarketDistribution) => item.market)
  const datasetData = data.map((item: MarketDistribution) => item.count)
  
  chartData.value = {
    labels,
    datasets: [{
      data: datasetData,
      label: 'Investments',
      backgroundColor: '#AFD0C8',
      hoverBackgroundColor: '#156D1E'
    }]
  }
})
</script>
