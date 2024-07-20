import useApiCall from '@/composables/useApiCall'
import overviewData from '@/services/overviewData'


export async function fetchTotalPortfolioValue() {
    return await useApiCall(overviewData.getTotalPortfolioValue)
}

export async function fetchTotalInvestedCapital() {
    return await useApiCall(overviewData.getTotalInvestedCapital)
}

export async function fetchTotalCapitalGainLoss() {
    return await useApiCall(overviewData.getTotalCapitalGainLoss)
}

export async function fetchUpcomingExpirations() {
    return await useApiCall(overviewData.getUpcomingExpirations)
}

export async function fetchAllInvestments() {
    return await useApiCall(overviewData.getAllInvestments)
}
