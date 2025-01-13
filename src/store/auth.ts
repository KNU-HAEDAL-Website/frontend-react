import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthProps {
  accessToken: string | null
  setAccessToken: (token: string) => void
  clearAccessToken: () => void
  isLoggedIn: () => boolean
}

export const useAuthStore = create(
  persist<AuthProps>(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (token) => {
        set({ accessToken: token })
      },
      clearAccessToken: () => {
        set({ accessToken: null })
      },
      isLoggedIn: () => !!get().accessToken,
    }),
    {
      name: 'access-token',
    },
  ),
)
