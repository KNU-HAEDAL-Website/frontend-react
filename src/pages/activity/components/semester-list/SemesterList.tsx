'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { Semester } from '@/types'

type SemesterListProps = {
  semester: Semester
  semesters: Semester[]
}

export const SemesterList = ({ semester, semesters }: SemesterListProps) => {
  const currentIndex =
    semesters.find((s) => s.semesterId === semester.semesterId)?.index ?? 0

  const previousIndex = Math.max((currentIndex ?? 0) - 1, 0)
  const nextIndex = Math.min(
    (currentIndex ?? semesters.length - 1) + 1,
    semesters.length - 1,
  )

  const visibleSemesters = getVisibleSemesterList(semesters, currentIndex)

  return (
    <Pagination className="pt-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={`/activity/${semesters[previousIndex].semesterId}`}
            disabled={currentIndex === 0}
          />
        </PaginationItem>
        <PaginationItem className="w-full">
          {visibleSemesters?.map((visibleSemester) => {
            const isActive = semester.semesterId === visibleSemester.semesterId

            return (
              <PaginationLink
                size="default"
                key={visibleSemester.semesterId}
                to={`/activity/${visibleSemester.semesterId}`}
                isActive={isActive}
                className={cn(!isActive && 'text-primary/60')}
              >
                {visibleSemester.semesterName}
              </PaginationLink>
            )
          })}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            to={`/activity/${semesters[nextIndex].semesterId}`}
            disabled={currentIndex === semesters.length - 1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

const getVisibleSemesterList = (
  semesters: Semester[],
  currentIndex: number,
) => {
  const endIndex = Math.min(semesters.length - 1, currentIndex + 1)
  const startIndex = Math.max(0, endIndex - 2)

  return semesters.slice(startIndex, startIndex + 3)
}
