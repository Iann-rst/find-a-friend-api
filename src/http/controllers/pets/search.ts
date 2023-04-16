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

const searchQuerySchema = z.object({
  age: z.enum(['cub', 'adolescent', 'elderly']).optional(),
  size: z.enum(['small', 'medium', 'big']).optional(),
  independence: z.enum(['low', 'medium', 'high']).optional(),
  type: z.enum(['cat', 'dog']).optional(),
})

export type SearchQuery = z.infer<typeof searchQuerySchema>

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { city } = searchParamsSchema.parse(request.params)

  const query = searchQuerySchema.parse(request.query)

  const petRepository = new PrismaPetRepository()
  const searchPetsUseCase = new SearchPetsUseCase(petRepository)

  const { pets } = await searchPetsUseCase.execute({ city, query })

  return reply.status(200).send({ pets })
}
