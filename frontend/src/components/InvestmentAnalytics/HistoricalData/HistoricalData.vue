<template>
    <h2 class="mb-4">Historical Data</h2>
    <v-row class="mb-4">
        <v-col cols="12" md="6" class="mb-1">
            <InvestmentGrowth />     
        </v-col>
        <v-col cols="12" md="6" class="mb-1">
            <AccruedInterest />     
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import InvestmentGrowth from './components/InvestmentGrowth.vue'
import AccruedInterest from './components/AccruedInterest.vue'
</script>