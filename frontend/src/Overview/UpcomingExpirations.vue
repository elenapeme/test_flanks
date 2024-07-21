<template>
  <v-card class="pa-2 elevation-4">
    <v-card-title>Upcoming Expirations</v-card-title>
    <v-card-text>
      <p class="p-2">You'll find here all the investments that will expire in less than three months</p>
      <v-data-table :items="items"  :headers="headers" height="19.6rem" no-data-text="No investments expires in the next 3 months">
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchUpcomingExpirations } from './composables/useOverviewData'
import type { Investment } from '@/types'

const headers = [
  { title: 'Name', key: 'name'},
  { title: 'ISIN', key: 'isin'},
  { title: 'Expiration Date', key: 'expiration_date'}
]

const { data } = await fetchUpcomingExpirations()
const items = ref<Investment[]>(data)

</script>