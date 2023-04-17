import { FastifyInstance } from 'fastify'
import { getBrasilStates } from './getBrasilStates'
import { getCitiesByStates } from './getCitiesByStates'

export async function locationRoutes(app: FastifyInstance) {
  app.get('/states', getBrasilStates)
  app.get('/cities/:code_uf', getCitiesByStates)
}
