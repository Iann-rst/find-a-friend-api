import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { details } from './details'
import { register } from './register'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/register', { onRequest: [verifyJwt] }, register)
  app.get('/cities/:city', search)
  app.get('/:pet_id', details)
}
