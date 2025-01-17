import { useState } from 'react'

import { Cross2Icon } from '@radix-ui/react-icons'

import { Semester } from '@/types'

import { DeleteSemesterDialog } from './delete-dialog'

interface SemesterListProps {
  semesters: Semester[]
}

export const SemesterList = ({ semesters }: SemesterListProps) => {
  const [selectedSemester, setSelectedSemester] = useState<Semester>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  if (!semesters.length) {
    return <div className="text-primary">학기를 생성해주세요.</div>
  }

  return (
    <>
      <div className="scroll scrollbar-hide flex flex-row gap-2 overflow-x-auto">
        {semesters.map((semester) => (
          <div
            key={semester.semesterId}
            className="flex h-9 items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <div className="h-fit bg-transparent p-0 hover:cursor-default hover:bg-transparent">
              {semester.semesterName}
            </div>
            <Cross2Icon
              onClick={() => {
                setDeleteDialogOpen(true)
                setSelectedSemester(semester)
              }}
              className="hover:cursor-pointer"
            />
          </div>
        ))}
      </div>
      <DeleteSemesterDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        semester={selectedSemester}
      />
    </>
  )
}
