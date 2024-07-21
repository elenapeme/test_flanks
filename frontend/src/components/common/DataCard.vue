<template>
  <v-card class="pa-2 elevation-4 data-card">
      <v-card-title>
          <v-icon class="mr-1">{{ icon }}</v-icon>
          {{ title }}
      </v-card-title>
      <v-skeleton-loader v-if="loading" type="list-item-two-line"></v-skeleton-loader>
      <v-card-text align="center" v-else>
          <span v-if="error">{{ error }}</span>
          <h2 :class="numberClass" v-else>{{ formattedValue }} € </h2>
      </v-card-text>
  </v-card>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

export interface Props {
  title: string
  icon: string
  apiCall: () => Promise<{ data: Record<string, string>, error: string | null, loading: boolean }>
  dataKey: string
}

const props = defineProps<Props>()
const loading = ref(true)
const error = ref<string | null>(null)
const value = ref<string | null>(null)

onMounted(async () => {
  const response = await props.apiCall()
  value.value = response.data[props.dataKey] || null
  error.value = response.error
  loading.value = response.loading
})

const numberClass = computed(() => {
  if (!value.value) return ""
  return {
    "text-green": parseFloat(value.value) >= 0,
    "text-red": parseFloat(value.value) < 0
  }
})

const formattedValue = computed(() => value.value || '0')
</script>

<style scoped>
.data-card:hover {
    background-color: hsla(159, 59%, 85%, 0.2);
}
</style>
  
