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

      const result = Object.keys(distribution).map(type => ({
        type,
        count: distribution[type]
      }))

      reply.send(result)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch investment distribution by type', details: err.message })
    }
  })

  fastify.get('/investments-by-entity', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const entityData = data.reduce((acc, investment) => {
        const entity = investment.entity
        if (!acc[entity]) {
          acc[entity] = 0
        }
        acc[entity] += 1
        return acc
      }, {} as Record<string, number>)

      const result = Object.keys(entityData).map(entity => ({
        entity,
        count: entityData[entity]
      }))

      reply.send(result)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch investments by entity', details: err.message })
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
        if (investment.market && investment.market.trim() !== "") {
          acc[investment.market] = (acc[investment.market] || 0) + 1
        }

        return acc
      }, {} as Record<string, number>)

      const result = Object.keys(distribution).map(market => ({
        market,
        count: distribution[market]
      }))

      reply.send(result)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch investments by market', details: err.message })
    }
  })


  fastify.get('/top-performing-investments', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const topN = 10 // Top N investments
      const sortedInvestments = data.sort((a, b) => b.capital_gain - a.capital_gain).slice(0, topN)
      const result = sortedInvestments.map(investment => ({
        name: investment.name,
        capital_gain: investment.capital_gain
      }))

      reply.send(result)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch top performing investments', details: err.message })
    }
  })

  fastify.get('/investment-growth-over-time', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const growthData = data.reduce((acc, investment) => {
        const date = investment.valuation_date
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += investment.balance
        return acc
      }, {} as Record<string, number>)

      const result = Object.keys(growthData).map(date => ({
        valuation_date: date,
        total_portfolio_value: growthData[date]
      }))

      reply.send(result)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch investment growth over time', details: err.message })
    }
  })

  fastify.get('/accrued-interest-over-time', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await parseCSV()
      const interestData = data.reduce((acc, investment) => {
        const date = investment.valuation_date
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += investment.accrued_interest
        return acc
      }, {} as Record<string, number>)

      const result = Object.keys(interestData).map(date => ({
        valuation_date: date,
        accrued_interest: interestData[date]
      }))

      reply.send(result)
    } catch (error) {
      const err = error as Error
      reply.status(500).send({ error: 'Failed to fetch accrued interest over time', details: err.message })
    }
  })

}
