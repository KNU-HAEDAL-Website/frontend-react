export type Semester = {
  index?: number
  semesterId: number
  semesterName: string
}

export type Role =
  | 'ROLE_WEB_MASTER'
  | 'ROLE_ADMIN'
  | 'ROLE_TEAM_LEADER'
  | 'ROLE_MEMBER'
