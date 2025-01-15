import { useFormContext } from 'react-hook-form'

import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui'

interface SignupCheckboxFieldProps {
  name: string
  formLabel: string
}

export const SignupCheckboxField = ({
  name,
  formLabel,
}: SignupCheckboxFieldProps) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl className="flex items-center gap-2 pl-2 pt-4">
            <div>
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FormLabel htmlFor={name}>{formLabel}</FormLabel>
            </div>
          </FormControl>
          <FormMessage className="pl-3" />
        </FormItem>
      )}
    />
  )
}
