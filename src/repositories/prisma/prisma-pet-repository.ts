import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = prisma.pet.create({
      data,
    })

    return pet
  }
}
