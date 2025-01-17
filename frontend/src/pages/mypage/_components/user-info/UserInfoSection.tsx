import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import {
  deleteProfileImageApi,
  profileQuries,
  updateProfileImageApi,
} from '@/service/api/profile'
import { BASE_URL } from '@/service/config'
import { ProfileResponseDto } from '@/service/model'
import {
  UpdateProfileImage,
  UpdateProfileImageSchema,
} from '@/service/schema/mypage'

interface UserInfoSectionProps {
  profile: ProfileResponseDto
  userId: string
}

export const UserInfoSection = ({ profile, userId }: UserInfoSectionProps) => {
  const form = useForm<UpdateProfileImage>({
    resolver: zodResolver(UpdateProfileImageSchema),
    defaultValues: {
      profileImage: profile.profileImageUrl
        ? new File([profile.profileImageUrl], 'profile')
        : undefined,
    },
  })

  const { mutate: updateProfileImage } = useMutation({
    mutationFn: updateProfileImageApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const { mutate: deleteProfileImage } = useMutation({
    mutationFn: deleteProfileImageApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const onSuccess = (message?: string) => {
    toast.success(message, { duration: 2000 })

    queryClient.invalidateQueries({
      queryKey: profileQuries.profiles({ userId: profile.userId }),
    })
  }

  const onClickUploadButton = () => {
    const fileInput =
      document.querySelector<HTMLInputElement>('input[type="file"]')
    fileInput?.click()
  }

  const onSumbit = form.handleSubmit((data) => {
    if (!data.profileImage) return

    updateProfileImage({
      userId,
      data: { file: data.profileImage },
    })
  })

  return (
    <section className="flex h-full w-full flex-col md:flex-row md:space-x-8">
      <div className="flex flex-col items-center justify-center space-y-5">
        <Avatar className="md:h-35 md:w-35 mx-auto flex h-32 w-32 items-center justify-center rounded-full">
          <AvatarImage src={`${BASE_URL}${profile.profileImageUrl}`} />
          <AvatarFallback />
        </Avatar>
        <Form {...form}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full flex-col gap-3 text-center align-middle md:flex-col"
          >
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple={false}
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null
                        field.onChange(file)
                        onSumbit()
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-55 flex flex-row items-center gap-5 md:w-full md:gap-4">
              <Button
                onClick={onClickUploadButton}
                className="text-md mx-auto my-auto h-full w-full rounded-full font-semibold"
                variant="outline"
                size="default"
              >
                <UploadIcon className="h-4 w-4 text-blue-500" />
              </Button>
              <Button
                onClick={() => deleteProfileImage({ userId })}
                className="text-md mx-auto my-auto rounded-full px-3 font-semibold md:h-full md:w-full"
                variant="destructive"
                size="icon"
              >
                <Cross2Icon className="h-auto w-6 font-bold text-white md:h-5 md:w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="mb-5 mt-10 border-t border-border md:hidden" />
      <div className="mt-5 space-y-3">
        <div className="flex flex-row items-center gap-3 md:gap-5">
          <div className="text-2xl font-bold md:text-3xl">
            {profile.userName}
          </div>
          <div className="text-md rounded-full border border-primary px-3 py-1 text-primary md:text-xl">
            {profile.role}
          </div>
        </div>
        <div className="text-xl">{profile.studentNumber}</div>
      </div>
    </section>
  )
}
