import { prisma } from '@/lib/prisma'
import { SearchPetsFilters } from '@/utils/pets-filter-types'
import { Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findByCity({ city, query }: SearchPetsFilters) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          equals: city,
          mode: 'insensitive',
        },
        ...query,
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
      include: {
        org: {
          select: {
            id: true,
            email: true,
            address: true,
            cep: true,
            name: true,
            whatsapp: true,
          },
        },
      },
    })

    return pet
  }
}
