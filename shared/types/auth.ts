export interface ILoginInput {
  email: string
  password: string
}

export interface IRegisterInput {
  name: string
  email: string
  password: string
}

export interface IUser {
  id: string
  email: string
  name: string
  role?: string
}

export interface IAuthResponse {
  token: string
  user: IUser
}

export enum UserRole {
  ADMIN = "admin",
  SALES = "sales",
}