'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { NotFound } from '@/components/common'
import { queryClient } from '@/lib/query-client'
import { activityQueries, deleteActivityApi } from '@/service/api'
import { Semester } from '@/types'

type ActivityListProps = {
  semester: Semester
}

export const ActivityList = ({ semester }: ActivityListProps) => {
  const {
    data: activities,
    status,
    error: fetchError,
  } = useQuery(activityQueries.list({ semesterId: semester.semesterId }))

  const { mutate: deleteActivity, error } = useMutation({
    mutationFn: deleteActivityApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const onSuccess = (message: string) => {
    toast.success(message, { duration: 2000 })

    queryClient.invalidateQueries({ queryKey: activityQueries.all() })
  }

  if (status === 'pending') return <ActivityListSkeleton />

  if (fetchError) return <NotFound />

  if (!activities.length)
    return <div className="text-muted-foreground">활동이 없습니다.</div>

  if (error) throw error

  return (
    <div className="flex flex-wrap gap-2">
      {activities?.map((activity) => (
        <div key={activity.activityId}>
          <div className="flex items-center gap-1 rounded-full bg-input px-4 py-1.5 text-sm">
            <div>{activity.activityName}</div>
            <Cross2Icon
              onClick={() =>
                deleteActivity({
                  semesterId: semester.semesterId,
                  activityId: activity.activityId,
                })
              }
              className="h-4 w-4 hover:cursor-pointer hover:text-primary/60"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const ActivityListSkeleton = () => {
  return (
    <div className="flex items-center gap-1 rounded-full bg-input px-4 py-1.5 text-sm">
      <div className="h-8 w-16 animate-pulse rounded-full bg-slate-100"></div>
      <div className="h-8 w-20 animate-pulse rounded-full bg-slate-50"></div>
      <div className="h-8 w-16 animate-pulse rounded-full bg-slate-100"></div>
    </div>
  )
}
