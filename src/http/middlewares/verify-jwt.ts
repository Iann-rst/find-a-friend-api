import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify() /* Verifica se tem um token no cabeçalho da requisição e verifica se é um token valido */
  } catch (error) {
    return reply.status(401).send({
      message: 'Unauthorized',
    })
  }
}
