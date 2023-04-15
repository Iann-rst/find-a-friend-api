import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { CreateOrgUseCase } from '@/use-cases/create-org'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createBodySchema = z.object({
  name: z
    .string({ required_error: 'Informe o nome do responsável pela Org' })
    .trim()
    .nonempty({ message: 'Informe o nome do responsável pela Org' }),

  email: z
    .string({ required_error: 'Informe o email da Org' })
    .email({ message: 'Informe o email' }),

  address: z
    .string({ required_error: 'Informe o endereço' })
    .trim()
    .nonempty({ message: 'Informe o endereço' }),

  cep: z
    .string({ required_error: 'Informe o CEP' })
    .trim()
    .nonempty({ message: 'Informe o CEP' }),

  whatsapp: z
    .string({ required_error: 'Informe o número do WhatsApp!' })
    .trim()
    .nonempty({ message: 'Informe o número do WhatsApp!' }),

  password: z
    .string({ required_error: 'Informe uma senha' })
    .trim()
    .nonempty({ message: 'Informe uma senha!' }),
})

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, address, cep, email, password, whatsapp } =
      createBodySchema.parse(request.body)

    const orgRepository = new PrismaOrgRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgRepository)

    const { org } = await createOrgUseCase.execute({
      name,
      address,
      cep,
      email,
      password,
      whatsapp,
    })

    return reply.status(201).send({
      org: {
        ...org,
        password: undefined,
      },
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    console.log(error)
    throw error
  }
}
