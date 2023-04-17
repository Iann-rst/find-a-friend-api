import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let authenticateOrgUseCase: AuthenticateOrgUseCase
let inMemoryOrgRepository: InMemoryOrgRepository

describe('Authenticate Org UseCase', () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    authenticateOrgUseCase = new AuthenticateOrgUseCase(inMemoryOrgRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryOrgRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
      cep: '00000-000',
      address: 'rua a',
      whatsapp: '999999999',
    })

    const { org } = await authenticateOrgUseCase.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateOrgUseCase.execute({
        email: 'johndoe@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryOrgRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
      cep: '00000-000',
      address: 'rua a',
      whatsapp: '999999999',
    })

    await expect(() =>
      authenticateOrgUseCase.execute({
        email: 'johndoe@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
