import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { parseCSV } from '../utils/csvParser'

export default async function (fastify: FastifyInstance, opts: any) {
  fastify.get('/all-data', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await parseCSV()
      reply.send(data)
    } catch (err) {
      reply.status(500).send({ error: 'Failed to read CSV data' })
    }
  })

  fastify.get('/total-portfolio-value', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const totalPortfolioValue = data.reduce((sum, investment) => sum + (investment.balance || 0), 0).toFixed(2)
      reply.send({ totalPortfolioValue })
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch total portfolio value', details: err.message })
    }
  })

  fastify.get('/total-invested-capital', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const totalInvestedCapital = data.reduce((sum, investment) => sum + (investment.cost || 0), 2).toFixed(2)
      reply.send({ totalInvestedCapital })
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch total invested capital', details: err.message })
    }
  })

  fastify.get('/total-capital-gain-loss', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const totalCapitalGainLoss = data.reduce((sum, investment) => sum + (investment.capital_gain || 0), 0).toFixed(2)
      reply.send({ totalCapitalGainLoss })
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch total capital gain/loss', details: err.message })
    }
  })

  fastify.get('/investment-distribution-by-type', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const distribution = data.reduce((acc, investment) => {
        acc[investment.type] = (acc[investment.type] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      reply.send(distribution)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch investment distribution by type', details: err.message })
    }
  })

  fastify.get('/investment-distribution-by-currency', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const distribution = data.reduce((acc, investment) => {
        acc[investment.currency] = (acc[investment.currency] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      reply.send(distribution)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch investment distribution by currency', details: err.message })
    }
  })

  fastify.get('/investment-performance', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const performance = data.map(investment => ({
        id: investment.id,
        performance: ((investment.balance - investment.cost) / investment.cost) * 100
      }))
      reply.send(performance)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch investment performance', details: err.message })
    }
  })

  fastify.get('/upcoming-expirations', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const upcomingExpirations = data.filter(investment => {
        const expirationDate = new Date(investment.expiration_date)
        return expirationDate && expirationDate <= new Date(new Date().setMonth(new Date().getMonth() + 3))
      })
      reply.send(upcomingExpirations)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch upcoming expirations', details: err.message })
    }
  })

  fastify.get('/investments-by-market', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const distribution = data.reduce((acc, investment) => {
        acc[investment.market] = (acc[investment.market] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      reply.send(distribution)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch investments by market', details: err.message })
    }
  })
}
