<template>
  <v-card class="pa-4 elevation-4">
    <v-card-title>
      Top Performing Investments
    </v-card-title>
    <v-card-text>
      <Bar v-if="chartData" :data="chartData" height="80vh"/>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { fetchTotalPerformingInvestments } from '../../composables/useInvestmentAnalyticsData'
import type { GraphData } from "@/types"

interface TopPerforming {
    name: string,
    capital_gain: number
}

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

const chartData: Ref<null | GraphData> = ref(null)


onMounted(async () => {
  const { data } = await fetchTotalPerformingInvestments()
  
  const labels = data.map((item: TopPerforming) => item.name)
  const datasetData = data.map((item: TopPerforming) => item.capital_gain)
  
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
