import { api } from '@/lib/api'
import { FastifyReply, FastifyRequest } from 'fastify'

interface GetBrasilStates {
  id: number
  nome: string
  sigla: string
  regiao: {
    id: number
    sigla: string
    nome: string
  }
}

interface State {
  id: string
  sigla: string
}

export async function getBrasilStates(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<State[]> {
  const response = await api.get('/')

  const data: GetBrasilStates[] = response.data

  const states = data.map((state) => {
    return {
      id: String(state.id),
      sigla: state.sigla,
    }
  })

  return reply.status(200).send(states)
}
