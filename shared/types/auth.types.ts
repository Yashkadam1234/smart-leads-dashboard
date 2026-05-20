export interface IAuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
    role?: string
  }
}
