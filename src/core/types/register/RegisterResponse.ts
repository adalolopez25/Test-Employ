export interface RegisterResponse {
  user: {
    id: string
    name: string
    email: string
    role: "user" | "admin"
  }
}