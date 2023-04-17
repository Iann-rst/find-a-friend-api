import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets'

let searchPetsUseCase: SearchPetsUseCase
let inMemoryPetRepository: InMemoryPetRepository

describe('Search Pets UseCase (filters)', () => {
  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository()
    searchPetsUseCase = new SearchPetsUseCase(inMemoryPetRepository)
  })

  it('should be able to list all pets in a city', async () => {
    const city = 'Barreiras'

    await inMemoryPetRepository.create({
      name: 'Magali',
      city,
      description: 'Gato mestiço',
      age: 'cub',
      independence: 'low',
      size: 'small',
      type: 'cat',
      org_id: 'org.id',
    })

    await inMemoryPetRepository.create({
      name: 'Frajola',
      city,
      description: 'Gato frajola',
      age: 'adolescent',
      independence: 'medium',
      size: 'small',
      type: 'cat',
      org_id: 'org.id',
    })

    const { pets } = await searchPetsUseCase.execute({ city })

    expect(pets).toHaveLength(2)
  })

  it('should be able to filter pets by city and its traits', async () => {
    const city = 'Barreiras'

    await inMemoryPetRepository.create({
      name: 'Magali',
      city,
      description: 'Gato mestiço',
      age: 'cub',
      independence: 'low',
      size: 'small',
      type: 'cat',
      org_id: 'org.id',
    })

    await inMemoryPetRepository.create({
      name: 'Frajola',
      city,
      description: 'Gato frajola',
      age: 'adolescent',
      independence: 'medium',
      size: 'small',
      type: 'cat',
      org_id: 'org.id',
    })

    const { pets } = await searchPetsUseCase.execute({
      city,
      query: {
        age: 'adolescent',
        size: 'small',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Frajola' })])
  })
})
