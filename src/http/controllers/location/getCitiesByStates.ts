import { api } from '@/lib/api'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  code_uf: z.coerce.string(),
})

interface ResponseDataApi {
  id: number
  nome: string
}

export async function getCitiesByStates(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { code_uf } = paramsSchema.parse(request.params)

  const response = await api.get(`/${code_uf}/municipios`)

  const cities_info: ResponseDataApi[] = response.data

  const cities = cities_info.map((city) => {
    return {
      id: city.id,
      nome: city.nome,
    }
  })
  return reply.status(200).send(cities)
}
