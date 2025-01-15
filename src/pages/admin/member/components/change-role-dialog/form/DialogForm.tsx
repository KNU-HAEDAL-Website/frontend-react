import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  Button,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { cn } from '@/lib/utils'
import { AdminUserQuries, changeRoleApi } from '@/service/api'
import { UserResponseDto } from '@/service/model'
import { ChangeRole, ChangeRoleSchema } from '@/service/schema'
import { Role } from '@/types'
import { convertRoleName } from '@/utils'

type ChangeRoleDialogFormProps = {
  user: UserResponseDto
}

const ROLES: Role[] = ['ROLE_ADMIN', 'ROLE_TEAM_LEADER', 'ROLE_MEMBER']

export const ChangeRoleDialogForm = ({ user }: ChangeRoleDialogFormProps) => {
  const {
    mutate: changeRole,
    isPending,
    error,
  } = useMutation({
    mutationFn: changeRoleApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const form = useForm<ChangeRole>({ resolver: zodResolver(ChangeRoleSchema) })

  if (error) {
    throw error
  }

  const onSubmit = form.handleSubmit((values) => {
    changeRole({ userId: user.userId, data: { role: values.role } })
  })

  const onSuccess = (message: string) => {
    queryClient.invalidateQueries({
      queryKey: AdminUserQuries.filter({ isActive: true }),
    })

    toast(message, { duration: 2000 })
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col space-y-2 pt-2">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-5">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col gap-4"
                >
                  {ROLES.map((role) => {
                    return (
                      <div key={role} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={role}
                          disabled={role === user.role}
                        />
                        <Label
                          className={cn(
                            role === user.role && 'text-primary/50',
                          )}
                        >
                          {convertRoleName(role)}
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" className="w-20" disabled={isPending}>
            변경하기
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
