import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/register', { onRequest: [verifyJwt] }, register)
}
