import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Role } from '@/types'

export type MyInfo = {
  userId: string
  userName: string
  role?: Role
  profileImage?: string
}

interface MyInfoProps {
  myInfo: MyInfo
  setMyInfo: (myInfo: MyInfo) => void
  clearMyInfo: () => void
}

export const useMyInfoStore = create(
  persist<MyInfoProps>(
    (set) => ({
      myInfo: { userId: '', userName: '', role: undefined, profileImage: '' },
      setMyInfo: (myInfo) => set({ myInfo }),
      clearMyInfo: () =>
        set({
          myInfo: {
            userId: '',
            userName: '',
            role: undefined,
            profileImage: '',
          },
        }),
    }),
    {
      name: 'my-info',
    },
  ),
)
