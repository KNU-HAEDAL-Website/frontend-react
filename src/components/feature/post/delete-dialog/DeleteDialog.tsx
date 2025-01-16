'use client'

import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'

interface DeletePostDialogProps {
  onClick: () => void
  disabled?: boolean
}

export const DeletePostDialog = ({
  onClick,
  disabled,
}: DeletePostDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="h-fit p-0 font-normal text-primary/70 hover:text-primary"
        >
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md flex gap-2">
            정말로 게시글을 삭제하시겠습니까?
          </DialogTitle>
          <DialogDescription className="text-start">
            삭제된 게시글은 복구가 불가합니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button onClick={() => setOpen(false)} variant="secondary">
            취소하기
          </Button>
          <Button variant="destructive" onClick={onClick} disabled={disabled}>
            삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
