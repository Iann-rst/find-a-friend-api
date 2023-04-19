import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { RegisterPetUseCase } from '@/use-cases/register-pet'
import axios from 'axios'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgNotFoundError } from './../../../use-cases/errors/org-not-found-error'

const registerBodySchema = z.object({
  name: z
    .string({ required_error: 'Informe o nome do pet.' })
    .trim()
    .nonempty({ message: 'Informe o nome do pet.' }),

  description: z
    .string({ required_error: 'Informe uma descrição sobre o pet.' })
    .trim()
    .nonempty({ message: 'Informe uma descrição do pet.' }),

  age: z.enum(['cub', 'adolescent', 'elderly']),
  size: z.enum(['small', 'medium', 'big']),
  independence: z.enum(['low', 'medium', 'high']),
  type: z.enum(['cat', 'dog']),
})

export type registerPet = z.infer<typeof registerBodySchema>

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, description, age, independence, size, type } =
      registerBodySchema.parse(request.body)

    const org_id = request.user.sub

    const petRepository = new PrismaPetRepository()
    const orgRepository = new PrismaOrgRepository()
    const registerPetUseCase = new RegisterPetUseCase(
      petRepository,
      orgRepository,
    )

    const org = await orgRepository.findById(org_id)

    if (!org) {
      return reply.status(404).send({
        message: 'Org não cadastrada!',
      })
    }

    const response = await axios.get(`http://viacep.com.br/ws/${org.cep}/json/`)
    const city: string = response.data.localidade

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
