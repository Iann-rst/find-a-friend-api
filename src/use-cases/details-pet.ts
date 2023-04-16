import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found.error'

interface DetailsPetUseCaseResponse {
  pet: Pet
}

export class DetailsPetUseCase {
  constructor(private petRepository: PetRepository) {}
  async execute(pet_id: string): Promise<DetailsPetUseCaseResponse> {
    const pet = await this.petRepository.findById(pet_id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
