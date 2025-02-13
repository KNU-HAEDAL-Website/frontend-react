import { useFormContext } from 'react-hook-form'

import { PartialBlock } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'
import { useMutation } from '@tanstack/react-query'

import { FormField, FormItem, FormMessage } from '@/components/ui'
import { uploadPostImageApi } from '@/service/api/post/image-upload'
import { BASE_URL } from '@/service/config/instance'
import { CreateActivityPost } from '@/service/schema'

interface PostContentFieldEditorProps {
  contents?: string
}

const PostContentFieldEditor = ({ contents }: PostContentFieldEditorProps) => {
  const { mutateAsync: uploadPostImage } = useMutation({
    mutationFn: uploadPostImageApi,
  })
  const { control } = useFormContext<CreateActivityPost>()

  const uploadFile = async (file: File): Promise<string> => {
    const data = await uploadPostImage({ data: { file } })
    const imageUrl = data.postImageUrl.replace('/upload', `${BASE_URL}/upload`)

    return imageUrl
  }

  const initialContent: PartialBlock[] = contents
    ? JSON.parse(contents)
    : [
        {
          type: 'paragraph',
        },
      ]

  const createEditor = useCreateBlockNote({ uploadFile })
  const updateEditor = useCreateBlockNote({ initialContent, uploadFile })

  const editor = contents ? updateEditor : createEditor

  return (
    <FormField
      control={control}
      name="postContent"
      render={({ field }) => (
        <FormItem>
          <BlockNoteView
            editor={editor}
            onChange={() => field.onChange(JSON.stringify(editor.document))}
            className="h-[500px] overflow-auto rounded-md border pt-4"
          />
          <div className="flex justify-end">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

export default PostContentFieldEditor
