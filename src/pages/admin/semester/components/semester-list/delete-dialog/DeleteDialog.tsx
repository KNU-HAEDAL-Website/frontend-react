import { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { deleteSemesterApi, semesterQueries } from '@/service/api'
import { Semester } from '@/types'

type DeleteSemesterDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  semester?: Semester
}

export const DeleteSemesterDialog = ({
  open,
  setOpen,
  semester,
}: DeleteSemesterDialogProps) => {
  const {
    mutate: deleteSemester,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteSemesterApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  if (error) throw error

  const onSuccess = (message: string) => {
    toast(message, { duration: 2000 })

    queryClient.invalidateQueries({ queryKey: semesterQueries.all() })

    setOpen(false)
  }

  if (!semester) return null

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-md flex gap-2">
              정말 {semester.semesterName} 학기를 삭제하시겠어요?
            </DialogTitle>
            <DialogDescription className="text-start">
              삭제하기 버튼 선택 시, 해당 학기의 모든 활동 정보는 삭제되며
              복구되지 않습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button onClick={() => setOpen(false)} variant="secondary">
              취소하기
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteSemester({ semesterId: semester.semesterId })
              }
              disabled={isPending}
            >
              삭제하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
