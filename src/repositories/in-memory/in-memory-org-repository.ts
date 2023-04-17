import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrgRepository } from '../org-repository'

export class InMemoryOrgRepository implements OrgRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address: data.address,
      cep: data.cep,
      whatsapp: data.whatsapp,
      password: data.password,
    }

    this.orgs.push(org)
    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
