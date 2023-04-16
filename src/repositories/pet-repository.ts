import { SearchPetsFilters } from '@/utils/pets-filter-types'
import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCity({ city, query }: SearchPetsFilters): Promise<Pet[]>
}
