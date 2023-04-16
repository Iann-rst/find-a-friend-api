export class OrgNotFoundError extends Error {
  constructor() {
    super('Org não cadastrada!')
  }
}
