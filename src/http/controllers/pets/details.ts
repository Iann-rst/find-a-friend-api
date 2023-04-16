import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { DetailsPetUseCase } from '@/use-cases/details-pet'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const detailsParamsSchema = z.object({
  pet_id: z.string(),
})

export async function details(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { pet_id } = detailsParamsSchema.parse(request.params)

    const petRepository = new PrismaPetRepository()
    const detailsPetUseCase = new DetailsPetUseCase(petRepository)

    const { pet } = await detailsPetUseCase.execute(pet_id)

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
