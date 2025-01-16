import { useState } from 'react'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Command as CommandPrimitive } from 'cmdk'

import {
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui'
import { UserResponseDto } from '@/service/model'

type MultipleMemberSelectProps = {
  options: UserResponseDto[]
  value: UserResponseDto[]
  onChange: (value: UserResponseDto[]) => void
}

export const MultipleMemberSelect = ({
  options,
  value,
  onChange,
}: MultipleMemberSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const selectMember = (member: UserResponseDto) => {
    if (value.includes(member)) {
      onChange(value.filter((m) => m.userId !== member.userId))
    } else {
      onChange([...value, member])
    }
    setInputValue('')
  }

  return (
    <Command>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:border-primary">
        <div className="flex flex-wrap gap-1">
          {value.map((member) => (
            <div
              key={member.userId}
              className="inline-flex w-fit items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 font-medium"
            >
              <div>{member.userName}</div>
              <Button
                variant="ghost"
                className="h-fit px-0 py-1"
                onClick={(e) => {
                  e.stopPropagation()
                  selectMember(member)
                }}
              >
                <Cross2Icon />
              </Button>
            </div>
          ))}
          <CommandPrimitive.Input
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen((prev) => !prev)}
            placeholder="게시판 이용자를 입력해주세요"
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <CommandList>
        {isOpen && (
          <CommandGroup className="top-0 z-10 mt-2 h-full w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            {options.map((member) => (
              <CommandItem
                key={member.studentNumber}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onSelect={() => {
                  selectMember(member)
                }}
              >
                {member.studentNumber} {member.userName}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )
}
