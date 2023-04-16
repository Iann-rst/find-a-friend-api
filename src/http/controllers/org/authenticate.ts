import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const orgRepository = new PrismaOrgRepository()
    const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgRepository)

    const { org } = await authenticateOrgUseCase.execute({ email, password })

    // TODO: Utilizar JWT e retornar apenas o token
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
