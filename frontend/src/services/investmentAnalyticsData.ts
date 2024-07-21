import { apiClient } from "@/utils/apiClient"

export default {
    getTotalPerformingInvestments() {
        return apiClient.get('/top-performing-investments')
    },
    getInvestmentGrowthOverTime() {
        return apiClient.get('/investment-growth-over-time')
    },
    getAccruedInterestOverTime() {
        return apiClient.get('/accrued-interest-over-time')
    },
    getInvestmentsDistributionByType() {
        return apiClient.get('/investment-distribution-by-type')
    },
    getInvestmentsByEntity() {
        return apiClient.get('/investments-by-entity')
    },
    getInvestmentsByMarket() {
        return apiClient.get('/investments-by-market')
    },
}