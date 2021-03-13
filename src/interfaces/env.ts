export interface iEnvDatabase {
  SCHEMA: string
  HOST: string
  PASSWORD: string
  USER: string
  DIALECT: 'mysql' | 'mariadb' | 'postgres' | 'mssql'
}

export interface iEnv {
  SERVER_PORT: string
  DATABASE: iEnvDatabase
}
