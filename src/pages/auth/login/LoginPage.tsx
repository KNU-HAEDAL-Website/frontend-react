import { LinkButton } from '@/components/common'

import { AuthCardLayout } from '../components'
import { LoginForm } from './components'

export default function LoginPage() {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <AuthCardLayout title="Sign in to HAEDAL">
        <LoginForm />
      </AuthCardLayout>
      <LinkButton linkTo="/auth/signup">
        <div>회원가입</div>
      </LinkButton>
    </div>
  )
}
