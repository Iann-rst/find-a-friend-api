export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Organização já cadastrada com esse email!')
  }
}
