import { Link, useLocation } from 'react-router'

import { Button, buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ActivityResponseDto } from '@/service/model'

type ActivityListProps = {
  activities: ActivityResponseDto[]
  activityId: number
}

export const ActivityList = ({ activities, activityId }: ActivityListProps) => {
  const { pathname } = useLocation()
  const basePath = pathname.split('/').slice(0, -1).join('/')

  return (
    <div className="flex justify-center gap-2">
      {activities.map((activity) => (
        <Link
          key={activity.activityId}
          to={`${basePath}/${activity.activityId}`}
        >
          <Button
            className={cn(
              buttonVariants({
                variant:
                  activityId === activity.activityId ? 'default' : 'secondary',
              }),
              'h-3 rounded-full p-4',
            )}
          >
            {activity.activityName}
          </Button>
        </Link>
      ))}
    </div>
  )
}
