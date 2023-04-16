import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetsUseCase } from '@/use-cases/search-pets'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const searchParamsSchema = z.object({
  city: z
    .string({ required_error: 'Informe a cidade.' })
    .trim()
    .nonempty({ message: 'Informe a cidade.' }),
})

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { city } = searchParamsSchema.parse(request.params)

  const petRepository = new PrismaPetRepository()
  const searchPetsUseCase = new SearchPetsUseCase(petRepository)

  const { pets } = await searchPetsUseCase.execute({ city })

  return reply.status(200).send({ pets })
}
