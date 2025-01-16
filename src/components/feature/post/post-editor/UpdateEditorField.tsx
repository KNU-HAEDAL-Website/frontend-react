import { useFormContext } from 'react-hook-form'

import { PartialBlock } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'
import { useMutation } from '@tanstack/react-query'

import { FormField, FormItem, FormMessage } from '@/components/ui'
import { CreateActivityPost } from '@/schema/post'
import { uploadPostImageApi } from '@/service/api/post/image-upload'
import { BASE_URL } from '@/service/config/instance'

interface UpdateContentFieldEditorProps {
  addImageId: (url: string, id: number) => void
  contents?: string
}

const UpdateContentFieldEditor = ({
  addImageId,
  contents,
}: UpdateContentFieldEditorProps) => {
  const { mutateAsync: uploadPostImage } = useMutation({
    mutationFn: uploadPostImageApi,
  })
  const { control } = useFormContext<CreateActivityPost>()

  const uploadFile = async (file: File): Promise<string> => {
    const data = await uploadPostImage({ data: { file } })

    const url = data.postImageUrl.split('/').pop() ?? ''
    addImageId(url, data.postImageId)

    const imageUrl = data.postImageUrl.replace('/upload', `${BASE_URL}/upload`)

    return imageUrl
  }

  const initialContent = JSON.parse(contents || '') as PartialBlock[]

  const editor = useCreateBlockNote({
    initialContent,
    uploadFile,
  })

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

export default UpdateContentFieldEditor
