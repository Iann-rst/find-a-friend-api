import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { RegisterPetUseCase } from './register-pet'

let inMemoryPetRepository: InMemoryPetRepository
let inMemoryOrgRepository: InMemoryOrgRepository
let registerPetUseCase: RegisterPetUseCase

describe('Register Pet UseCase', () => {
  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository()
    inMemoryOrgRepository = new InMemoryOrgRepository()
    registerPetUseCase = new RegisterPetUseCase(
      inMemoryPetRepository,
      inMemoryOrgRepository,
    )
  })

  it('should be able to register a new pet', async () => {
    const org = await inMemoryOrgRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '00000-000',
      address: 'rua a',
      whatsapp: '999999999',
    })

    const { pet } = await registerPetUseCase.execute({
      name: 'Magali',
      city: 'Barreiras',
      description: 'Gato mestiço',
      age: 'cub',
      independence: 'low',
      size: 'small',
      type: 'cat',
      org_id: org.id,
    })

    expect(pet).toHaveProperty('id')
  })

  it('should not be able to register a new pet without org', async () => {
    await expect(() =>
      registerPetUseCase.execute({
        name: 'Magali',
        city: 'Barreiras',
        description: 'Gato mestiço',
        age: 'cub',
        independence: 'low',
        size: 'small',
        type: 'cat',
        org_id: 'fake org_id',
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
