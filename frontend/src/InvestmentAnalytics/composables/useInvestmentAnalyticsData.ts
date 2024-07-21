import useApiCall from '@/composables/useApiCall'
import investmentAnalyticsData from '@/services/investmentAnalyticsData'


export async function fetchInvestmentGrowthOverTime() {
    return await useApiCall(investmentAnalyticsData.getInvestmentGrowthOverTime)
}

export async function fetchAccruedInterestOverTime() {
    return await useApiCall(investmentAnalyticsData.getAccruedInterestOverTime)
}

export async function fetchInvestmentsDistributionByType() {
    return await useApiCall(investmentAnalyticsData.getInvestmentsDistributionByType)
}

export async function fetchInvestmentsByEntity() {
    return await useApiCall(investmentAnalyticsData.getInvestmentsByEntity)
}

export async function fetchInvestmentsByMarket() {
    return await useApiCall(investmentAnalyticsData.getInvestmentsByMarket)
}

export async function fetchTotalPerformingInvestments() {
    return await useApiCall(investmentAnalyticsData.getTotalPerformingInvestments)
}

