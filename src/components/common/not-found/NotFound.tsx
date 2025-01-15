import { useNavigate } from 'react-router'

import { Button } from '@/components/ui'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-full min-h-20 flex-1 flex-col items-center justify-center p-10">
      <div>네트워크 상태를 확인해주세요.</div>
      <div>서버와의 통신이 원활하지 않아 데이터를 불러올 수 없습니다.</div>
      <Button onClick={() => navigate(0)} className="mt-4">
        재시도
      </Button>
    </div>
  )
}
