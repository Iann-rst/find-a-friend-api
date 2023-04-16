import { registerPet } from '@/http/controllers/pets/register'
import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

type RegisterPetUseCaseRequest = registerPet & {
  org_id: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    name,
    description,
    age,
    city,
    independence,
    size,
    type,
    org_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.create({
      name,
      description,
      age,
      city,
      independence,
      size,
      type,
      org_id,
    })

    return { pet }
  }
}
