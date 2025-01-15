import { z } from 'zod'

export const ChangeRoleSchema = z.object({
  role: z.enum(['ROLE_ADMIN', 'ROLE_TEAM_LEADER', 'ROLE_MEMBER']),
})
export type ChangeRole = z.infer<typeof ChangeRoleSchema>
