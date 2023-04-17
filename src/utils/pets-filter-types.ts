import { SearchQuery } from '@/http/controllers/pets/search'

export interface SearchPetsFilters {
  city: string
  query?: SearchQuery
}
