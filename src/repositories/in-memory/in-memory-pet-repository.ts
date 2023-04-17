import { SearchPetsFilters } from '@/utils/pets-filter-types'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      city: data.city,
      age: data.age,
      size: data.size,
      independence: data.independence,
      type: data.type,
      org_id: data.org_id,
    }

    this.pets.push(pet)

    return pet
  }

  async findByCity({ city, query }: SearchPetsFilters): Promise<Pet[]> {
    const pets = this.pets.filter((pet) => pet.city === city)

    if (!query) {
      return pets
    }

    const new_pets = this.pets.filter(
      (pet) =>
        (!query.age || pet.age === query?.age) &&
        (!query.independence || pet.independence === query?.independence) &&
        (!query.size || pet.size === query?.size) &&
        (!query.type || pet.type === query?.type),
    )

    return new_pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
