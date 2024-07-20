import { ref, type UnwrapRef } from 'vue'

export default async function useApiCall<T>(apiCall: () => Promise<{ data: T }>) {
    const data = ref<T | null>(null)
    const error = ref<string | null>(null)
    const loading = ref<boolean>(false)

    try {
        loading.value = true
        const response = await apiCall()
        data.value = response.data as UnwrapRef<T>
    } catch (err) {
        error.value = 'Error fetching data'
        console.error('Error fetching data:', err)
    } finally {
        loading.value = false
    }

    return {
        data: data.value,
        error: error.value,
        loading: loading.value
    }
}
