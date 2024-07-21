<template>
    <v-card class="pa-2 elevation-4">
        <v-card-title  class="d-flex align-center pe-2">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Investments
            <v-spacer></v-spacer>

            <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="solo-filled"
                flat
                hide-details
                single-line
            ></v-text-field>
        </v-card-title>
        <v-card-text>
            <template v-slot:text>
                <v-text-field
                    v-model="search"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                ></v-text-field>
            </template>
            <v-data-table :items="items" density="compact" item-key="name" :search="search" :headers="headers" height="15rem">
                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { fetchAllInvestments } from './composables/useOverviewData'
import type { Investment } from '@/types'

const search = ref('')

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'ISIN', key: 'isin' },
  { title: 'Entity', key: 'entity' },
  { title: 'Currency', key: 'currency' },
  { title: 'Shares', key: 'number_of_shares' },
  { title: 'Balance', key: 'balance' },
  { title: 'Capital Gain', key: 'capital_gain' },
  { title: 'Accrued Interest', key: 'accrued_interest' },
  { title: 'Cost', key: 'cost' },
  { title: 'Valuation Date', key: 'valuation_date' },
  { title: 'Expiration Date', key: 'expiration_date' },
]

const { data } = await fetchAllInvestments()

const items = ref<Investment[]>(data)  
</script>