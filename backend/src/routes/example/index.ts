import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default async function (fastify: FastifyInstance, opts: any) {
  fastify.get('/', async function (request: FastifyRequest, reply: FastifyReply) {
    return 'this is an example'
  })
}
