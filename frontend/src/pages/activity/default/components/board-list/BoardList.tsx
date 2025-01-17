import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'

import { useQuery } from '@tanstack/react-query'

import { NameLabel, PaginationButtons } from '@/components/common'
import { Card, CardContent, CardTitle } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { boardQueries } from '@/service/api'
import { BASE_URL } from '@/service/config/instance'
import { ParticipantResponseDto } from '@/service/model'

import { BoardListSkeleton } from './Skeleton'

type ActivityBoardListProps = {
  activityId: number
}

export const ActivityBoardList = ({ activityId }: ActivityBoardListProps) => {
  const { search, pathname } = useLocation()
  const params = new URLSearchParams(search)

  const page =
    Number(params.get('page')) > 0 ? Number(params.get('page')) - 1 : 0

  const { data, status, isPlaceholderData } = useQuery(
    boardQueries.list({ activityId, page }),
  )

  useEffect(() => {
    if (!isPlaceholderData && data?.nextPageToken) {
      queryClient.prefetchQuery(boardQueries.list({ activityId, page }))
    }
  }, [data, isPlaceholderData, page, activityId])

  if (status === 'pending') return <BoardListSkeleton />
  if (!data?.boards?.length) return <div>게시판이 없습니다.</div>

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="grid w-full grid-cols-1 place-items-center gap-10 sm:grid-cols-2 md:grid-cols-1">
        {data.boards.map((board) => (
          <Link
            key={board.boardId}
            to={`${pathname}/boards/${board.boardId}`}
            className="w-full"
          >
            <Card className="flex w-full flex-col rounded-none border-none md:flex-row">
              <div className="flex aspect-video h-auto w-full items-center justify-center overflow-hidden md:max-w-96">
                <img
                  sizes="100vw"
                  className="h-auto w-full"
                  src={`${BASE_URL}${board.boardImageUrl}`}
                  alt={board.boardName}
                />
              </div>
              <div className="flex min-w-fit flex-col md:min-w-80">
                <div className="flex flex-row gap-4 px-6 py-2 sm:flex-col sm:items-start sm:gap-2 lg:flex-row lg:gap-4">
                  <CardTitle className="text-md md:text-lg">
                    {board.boardName}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-1">
                    {board.participants.map(
                      (participant: ParticipantResponseDto) => (
                        <NameLabel
                          className="min-w-fit"
                          key={participant.userId}
                          name={participant.userName}
                        />
                      ),
                    )}
                  </div>
                </div>
                <CardContent className="text-xs text-primary/70 md:text-sm">
                  {board.boardIntro}
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <PaginationButtons data={data} />
    </div>
  )
}
