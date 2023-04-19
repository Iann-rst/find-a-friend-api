import { registerPet } from '@/http/controllers/pets/register'
import { OrgRepository } from '@/repositories/org-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found-error'

type RegisterPetUseCaseRequest = registerPet & {
  org_id: string
  city: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

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
    const org = await this.orgRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

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
