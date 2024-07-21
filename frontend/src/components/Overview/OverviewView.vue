<template>
  <v-container fluid max-width="lg" class="mx-auto">
    <h1 class="display-1 mb-4">Portfolio Overview</h1>
    <v-row class="mb-4" align="center">
      <v-col
        cols="12"
        md="9"
        class="d-flex justify-start flex-wrap"
        order="1"
      >
        <v-col cols="12" md="4" class="d-flex justify-center">
          <DataCard title="Total Portfolio Value" :apiCall="fetchTotalPortfolioValue" dataKey="totalPortfolioValue" icon="mdi-finance"/>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center">
          <DataCard title="Total Invested Capital" :apiCall="fetchTotalInvestedCapital" dataKey="totalInvestedCapital" icon="mdi-trending-up"/>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center">
          <DataCard title="Total Capital Gain/Loss" :apiCall="fetchTotalCapitalGainLoss" dataKey="totalCapitalGainLoss" icon="mdi-chart-bar"/>
        </v-col>
        <v-col >
          <InvestmentsList />
        </v-col>
      </v-col>
      <v-col
        cols="12"
        md="3"
        class="d-flex justify-center"
        order="2"
      >
        <UpcomingExpirations />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import DataCard from '../common/DataCard.vue'
import { fetchTotalPortfolioValue, fetchTotalInvestedCapital, fetchTotalCapitalGainLoss } from './composables/useOverviewData'
import UpcomingExpirations from './UpcomingExpirations.vue'
import InvestmentsList from './InvestmentsList.vue'
</script>

<style scoped>
.display-1 {
  font-size: 2.5rem;
  font-weight: 700;
}
</style>



  