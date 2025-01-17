import { z } from 'zod'

export const CreateActivityPostSchema = z.object({
  postTitle: z
    .string()
    .min(1, { message: '게시글 제목을 입력해주세요.' })
    .max(50, { message: '게시글 제목은 50자 이내여야 합니다.' }),
  postContent: z.string().min(1, { message: '게시글 내용을 입력해주세요.' }),
  postImageIds: z.number().array(),
  postActivityStartDate: z.string().refine((date) => date !== undefined, {
    message: '활동 날짜를 선택해주세요.',
  }),
  postActivityEndDate: z.string(),
})
export type CreateActivityPost = z.infer<typeof CreateActivityPostSchema>

export const CreateNoticePostSchema = z.object({
  postTitle: z
    .string()
    .min(1, { message: '게시글 제목을 입력해주세요.' })
    .max(50, { message: '게시글 제목은 50자 이내여야 합니다.' }),
  postContent: z.string().min(1, { message: '게시글 내용을 입력해주세요.' }),
  postImageIds: z.number().array(),
})
export type CreateNoticePost = z.infer<typeof CreateNoticePostSchema>
