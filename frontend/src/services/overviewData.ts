import { apiClient } from "@/utils/apiClient"

export default {
    getTotalPortfolioValue() {
        return apiClient.get('/total-portfolio-value')
    },
    getTotalInvestedCapital() {
        return apiClient.get('/total-invested-capital')
    },
    getTotalCapitalGainLoss() {
        return apiClient.get('/total-capital-gain-loss')
    },
    getUpcomingExpirations() {
        return apiClient.get('/upcoming-expirations')
    },
    getAllInvestments() {
        return apiClient.get('/all-data')
    }
}