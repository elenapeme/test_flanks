<template>
  <v-card class="pa-4 elevation-4">
    <v-card-title>
      Investment Growth Over Time
    </v-card-title>
    <v-card-text>
      <Line v-if="chartData" :data="chartData" height="80vh"/>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { fetchInvestmentGrowthOverTime } from '../../composables/useInvestmentAnalyticsData'
import type { GraphData } from "@/types"

interface InvestmentGrowth {
  valuation_date: string,
  total_portfolio_value: number
}

ChartJS.register(Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement)

const chartData: Ref<null | GraphData> = ref(null)

onMounted(async () => {
  const { data } = await fetchInvestmentGrowthOverTime()
  
  const labels = data.map((item: InvestmentGrowth) => item.valuation_date)
  const datasetData = data.map((item: InvestmentGrowth) => item.total_portfolio_value)
  
  chartData.value = {
    labels,
    datasets: [{
      label: 'Investment Value',
      data: datasetData,
      fill: false,
      borderColor: '#AFD0C8',
      tension: 0.1,
      backgroundColor: '#AFD0C8',
      pointBackgroundColor: '#FFFFFF',
      pointHoverBackgroundColor: '#156D1E'
    }]
  }
})
</script>