import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useFormContext } from 'react-hook-form'

import { getDateDistance, kstFormat } from '@toss/date'

import {
  Button,
  Calendar,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormField,
  FormItem,
  FormMessage,
  Label,
} from '@/components/ui'
import { CreateActivityPost } from '@/service/schema'

import { DateDialogTriggerButton } from './TriggerButton'

export const ActivityDateFieldDialog = () => {
  const { control, setValue, getValues } = useFormContext<CreateActivityPost>()

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const onSelectCalendar = (from?: Date, to?: Date) => {
    if (from) {
      setValue('postActivityStartDate', kstFormat(from, 'yyyy-LL-dd'))
    }
    if (from && to) {
      setValue(
        'postActivityEndDate',
        getDateDistance(from, to).days === 0 ? '' : kstFormat(to, 'yyyy-LL-dd'),
      )
    } else {
      setValue('postActivityEndDate', '')
    }
  }

  return (
    <FormField
      control={control}
      name="postActivityStartDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center">
            <Label className="text-md w-40">활동 날짜</Label>
            <div className="w-full">
              <Dialog>
                <DateDialogTriggerButton
                  startDate={field.value ? new Date(field.value) : undefined}
                  endDate={
                    getValues('postActivityEndDate')
                      ? new Date(getValues('postActivityEndDate'))
                      : undefined
                  }
                />
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>활동 날짜 선택하기</DialogTitle>
                    <DialogDescription>
                      시작일과 종료일을 선택해주세요.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center">
                    <Calendar
                      mode="range"
                      selected={date}
                      onSelect={(range) => {
                        setDate(range)
                        onSelectCalendar(range?.from, range?.to)
                      }}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="w-fit">저장하기</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex justify-end">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
