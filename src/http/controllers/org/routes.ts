import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { register } from './register'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/register', register)

  // (login)
  app.post('/session', authenticate)

  // refresh-token
  app.patch('/token/refresh', refresh)
}
