<template>
    <h2 class="mb-4">Investment Insights</h2>
    <v-row class="mb-4">
        <v-col cols="8" class="mb-1">
            <v-card class="elevation-4" width="100%">
            <v-card-text>
                <v-row >
                <v-col cols="12" md="6">
                    <InvestmentDistributionType />
                </v-col>
                <v-col cols="12" md="6">
                    <InvestmentDistributionEntity />
                </v-col>
                </v-row>
            </v-card-text>
            </v-card>           
        </v-col>
        
    </v-row>
    <v-row>
        <v-col cols="12" class="mb-1">
            <InvestmentsByMarket />               
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" class="mb-4">
            <TopPerformingInvestments />   
        </v-col>  
    </v-row>
</template>
<script setup lang="ts">
import InvestmentDistributionType from './components/InvestmentDistributionType.vue'
import InvestmentDistributionEntity from './components/InvestmentDistributionEntity.vue'
import InvestmentsByMarket from './components/InvestmentsByMarket.vue'
import TopPerformingInvestments from './components/TopPerformingInvestments.vue'
</script>