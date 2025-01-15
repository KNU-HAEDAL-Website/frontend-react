import { Role } from '@/types'

type Kr_Role = '해구르르' | '관리자' | '팀장' | '일반'

export default function convertRoleName(role: Role): Kr_Role {
  switch (role) {
    case 'ROLE_WEB_MASTER':
      return '관리자'
    case 'ROLE_ADMIN':
      return '해구르르'
    case 'ROLE_TEAM_LEADER':
      return '팀장'
    case 'ROLE_MEMBER':
      return '일반'
  }
}
