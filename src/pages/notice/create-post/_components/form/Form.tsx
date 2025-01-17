import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'

import { Block } from '@blocknote/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { PostContentFieldEditor } from '@/components/feature'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  Separator,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { NoticePostQuries, addNoticePostApi } from '@/service/api'
import { CreateNoticePost, CreateNoticePostSchema } from '@/service/schema'

export const CreateNoticePostForm = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { mutate: addNoticePost, isPending } = useMutation({
    mutationFn: addNoticePostApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const form = useForm<CreateNoticePost>({
    resolver: zodResolver(CreateNoticePostSchema),
    defaultValues: {
      postTitle: '',
      postContent: '',
      postImageIds: [],
    },
  })

  const imageMapRef = useRef<Map<string, number>>(new Map())

  const addImageId = (url: string, id: number) => {
    imageMapRef.current.set(url, id)
  }

  const onSubmit = (values: CreateNoticePost) => {
    const imageIds: number[] = []

    JSON.parse(values.postContent)
      .filter((block: Block) => block.type === 'image')
      .forEach((block: Block) => {
        if (block.type === 'image') {
          const url = block.props.url.split('/').pop() ?? ''
          const imageId = imageMapRef.current.get(url)

          if (imageId) imageIds.push(imageId)
        }
      })

    form.setValue('postImageIds', imageIds)

    addNoticePost({ data: values })
  }

  const onSuccess = (message?: string) => {
    toast.success(message, { duration: 2000 })

    queryClient.invalidateQueries({ queryKey: NoticePostQuries.all() })

    const basePath = pathname.split('/').slice(0, -1).join('/')
    navigate(basePath)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="postTitle"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col md:flex-row md:items-center">
                <Label className="text-md w-40">게시글 제목</Label>
                <FormControl>
                  <Input value={field.value} onChange={field.onChange} />
                </FormControl>
              </div>
              <div className="flex justify-end">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Separator />
        <div>
          <Label className="text-md">게시글 내용 작성하기</Label>
          <PostContentFieldEditor
            addImageId={(url: string, id: number) => addImageId(url, id)}
          />
        </div>
        <div className="flex justify-end pb-10">
          <Button type="submit" disabled={isPending}>
            공지사항 업로드
          </Button>
        </div>
      </form>
    </Form>
  )
}
