import { SearchQuery } from '@/http/controllers/pets/search'
import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  query: SearchQuery
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    city,
    query,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petRepository.findByCity({ city, query })

    return { pets }
  }
}
