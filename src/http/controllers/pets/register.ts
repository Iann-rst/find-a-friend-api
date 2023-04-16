import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { RegisterPetUseCase } from '@/use-cases/register-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerBodySchema = z.object({
  name: z
    .string({ required_error: 'Informe o nome do pet.' })
    .trim()
    .nonempty({ message: 'Informe o nome do pet.' }),

  description: z
    .string({ required_error: 'Informe uma descrição sobre o pet.' })
    .trim()
    .nonempty({ message: 'Informe uma descrição do pet.' }),

  city: z
    .string({ required_error: 'Informe a cidade.' })
    .trim()
    .nonempty({ message: 'Informe a cidade.' }),

  age: z.enum(['cub', 'adolescent', 'elderly']),
  size: z.enum(['small', 'medium', 'big']),
  independence: z.enum(['low', 'medium', 'high']),
  type: z.enum(['cat', 'dog']),
})

export type registerPet = z.infer<typeof registerBodySchema>

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, description, age, city, independence, size, type } =
      registerBodySchema.parse(request.body)

    const org_id = request.user.sub

    const petRepository = new PrismaPetRepository()
    const orgRepository = new PrismaOrgRepository()
    const registerPetUseCase = new RegisterPetUseCase(
      petRepository,
      orgRepository,
    )

    const { pet } = await registerPetUseCase.execute({
      name,
      description,
      age,
      city,
      independence,
      size,
      type,
      org_id,
    })

    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
    console.log(error)
    throw error
  }
}
