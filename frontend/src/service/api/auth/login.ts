import { AUTHORIZATION_API, BACKEND_API } from '@/service/config'
import { Login, LoginRequest, Logout } from '@/service/model'
import { useAuthStore } from '@/store/auth'

export const loginApi = async ({ data }: LoginRequest) => {
  const loginClient = new Login(BACKEND_API)
  const response = await loginClient.signIn1(data)

  const accessToken = response.headers['authorization']

  return accessToken
}

export const logoutApi = async () => {
  const { clearAccessToken } = useAuthStore.getState()

  const logoutClient = new Logout(AUTHORIZATION_API)
  const response = await logoutClient.signIn()

  clearAccessToken()

  return response.data
}
