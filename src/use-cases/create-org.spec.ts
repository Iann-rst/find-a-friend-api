import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let createOrgUseCase: CreateOrgUseCase
let inMemoryOrgRepository: InMemoryOrgRepository

describe('Create Org UseCase', () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    createOrgUseCase = new CreateOrgUseCase(inMemoryOrgRepository)
  })

  it('should be able to register', async () => {
    const { org } = await createOrgUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '00000-000',
      address: 'rua a',
      whatsapp: '999999999',
    })

    expect(org).toHaveProperty('id')
    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon register', async () => {
    const { org } = await createOrgUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '00000-000',
      address: 'rua a',
      whatsapp: '999999999',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const email = 'johndoe@email.com'

    await createOrgUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
      cep: '00000-000',
      address: 'rua a',
      whatsapp: '999999999',
    })

    await expect(() =>
      createOrgUseCase.execute({
        name: 'John Doe 2',
        email,
        password: '1234562',
        cep: '00000-001',
        address: 'rua b',
        whatsapp: '999999998',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
