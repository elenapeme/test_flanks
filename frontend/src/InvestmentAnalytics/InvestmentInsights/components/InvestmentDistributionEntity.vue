<template>
  <v-card-title>
    Investment Distribution by Entity
  </v-card-title>
  <v-card-text class="d-flex justify-space-evenly">
    <Pie v-if="chartData" :data="chartData" style="height: 200px;"/>
  </v-card-text>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { fetchInvestmentsByEntity } from '../../composables/useInvestmentAnalyticsData'
import type { GraphData } from "@/types"

interface EntityDistribution {
    entity: string,
    count: number
}

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData: Ref<null | GraphData> = ref(null)

onMounted(async () => {
  const { data } = await fetchInvestmentsByEntity()
  
  const labels = data.map((item: EntityDistribution) => item.entity)
  const datasetData = data.map((item: EntityDistribution) => item.count)
  
  chartData.value = {
    labels,
    datasets: [{
      data: datasetData,
      backgroundColor: ['#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB'],
      hoverBackgroundColor: '#AFD0C5'
    }]
  }
})
</script>
  