import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DetailsPetUseCase } from './details-pet'
import { PetNotFoundError } from './errors/pet-not-found.error'

let inMemoryPetRepository: InMemoryPetRepository
let detailsPetUseCase: DetailsPetUseCase

describe('Details Pet UseCase', () => {
  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository()
    detailsPetUseCase = new DetailsPetUseCase(inMemoryPetRepository)
  })

  it('should be able to show details of a pet', async () => {
    const new_pet = await inMemoryPetRepository.create({
      name: 'Magali',
      city: 'Barreiras',
      description: 'Gato mestiço',
      age: 'cub',
      independence: 'low',
      size: 'small',
      type: 'cat',
      org_id: 'org.id',
    })

    const { pet } = await detailsPetUseCase.execute(new_pet.id)

    expect(pet).toHaveProperty('id')
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to show details of a non-existent pet', async () => {
    const pet_id = 'non-existent-pet'
    await expect(() =>
      detailsPetUseCase.execute(pet_id),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
