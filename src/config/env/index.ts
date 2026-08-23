export class NonExistingEnvVariableError extends Error {
  public constructor(variable: string) {
    super(`A variável de ambiente ${variable} precisa ser configurada.`);
  }
}
