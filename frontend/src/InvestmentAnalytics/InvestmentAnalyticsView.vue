<template>
  <v-container fluid max-width="lg" class="mx-auto">
    <h1 class="display-1 mb-4">Investment Analytics</h1>
    <v-tabs
      v-model="tab"
      class="mb-4 text-green"
    >
      <v-tab value="one">Investment Distribution</v-tab>
      <v-tab value="two">Performance analysis</v-tab>
      <v-tab value="three">Historical Data </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="one">
        <InvestmentInsights />
      </v-tabs-window-item>

      <v-tabs-window-item value="two">
        <PerformanceAnalysis />
      </v-tabs-window-item>

      <v-tabs-window-item value="three">
        <HistoricalData />
      </v-tabs-window-item>

      
    </v-tabs-window>    
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InvestmentInsights from './InvestmentInsights/InvestmentInsights.vue'
import HistoricalData from './HistoricalData/HistoricalData.vue'
import PerformanceAnalysis from './PerformanceAnalysis/PerformanceAnalysis.vue'

const tab = ref(null)
</script>

<style scoped>
.display-1 {
  font-size: 2.5rem;
  font-weight: 700;
}
</style>
