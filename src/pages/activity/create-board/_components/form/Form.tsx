import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { ImageInput } from '@/components/common'
import { Button, Form, Input, Textarea } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { addBoardApi, boardQueries } from '@/service/api'
import { UserResponseDto } from '@/service/model'
import { CreateBoard, CreateBoardSchema } from '@/service/schema'

import { BoardFormField } from './form-field'
import { SelectMemberInput } from './select-member-input'

type CreateBoardFromProps = {
  activityId: number
}

export const CreateBoardForm = ({ activityId }: CreateBoardFromProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const basePath = pathname.split('/').slice(0, -1).join('/')

  const { mutate: addBoard, isPending } = useMutation({
    mutationFn: addBoardApi,
    onSuccess: (data) => onSuccess(data.message),
    onError: (error) => onError(error),
  })

  const form = useForm<CreateBoard>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      boardName: '',
      boardIntro: '',
      participants: [],
      file: new File([], ''),
    },
  })
  const [selectedMember, setSelectedMember] = useState<UserResponseDto[]>([])

  const onSubmit = (form: CreateBoard) => {
    addBoard({ activityId, data: { file: form.file, boardRequestDto: form } })
  }

  const onSuccess = (message?: string) => {
    toast(message, { duration: 2000 })

    queryClient.invalidateQueries({ queryKey: boardQueries.all() })
    navigate(basePath)
  }

  const onError = (error: Error) => {
    if (error instanceof AxiosError && error.response) {
      const { code, errors } = error.response.data

      if (code === 'COMMON_001') {
        toast.error(`${errors[0].field}에는 {{errors[0].message}}`)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 pb-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <BoardFormField name="boardName" label="게시판 제목">
          {(field) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="게시판 제목을 입력해주세요"
            />
          )}
        </BoardFormField>
        <BoardFormField name="boardIntro" label="게시판 소개">
          {(field) => (
            <Textarea
              value={field.value}
              onChange={field.onChange}
              placeholder="게시판 소개글을 작성해주세요"
            />
          )}
        </BoardFormField>
        <BoardFormField name="file" label="게시판 대표 사진">
          {(field) => <ImageInput field={field} />}
        </BoardFormField>
        <BoardFormField name="participants" label="게시판 이용자">
          {() => (
            <SelectMemberInput
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
            />
          )}
        </BoardFormField>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            onClick={() =>
              form.setValue(
                'participants',
                selectedMember.map((member) => member.userId),
              )
            }
          >
            게시판 생성하기
          </Button>
        </div>
      </form>
    </Form>
  )
}
