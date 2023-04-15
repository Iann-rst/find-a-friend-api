import { OrgRepository } from '@/repositories/org-repository'
import type { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface CreateOrgUseCaseRequest {
  name: string
  address: string
  cep: string
  email: string
  password: string
  whatsapp: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}
  async execute({
    name,
    email,
    address,
    cep,
    password,
    whatsapp,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      email,
      address,
      cep,
      password: password_hash,
      whatsapp,
    })

    return { org }
  }
}
