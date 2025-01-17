import { ControllerRenderProps } from 'react-hook-form'

import { Input } from '@/components/ui'

type ImageInputProps = {
  field: ControllerRenderProps
}

export const ImageInput = ({ field }: ImageInputProps) => {
  return (
    <Input
      accept="image/*"
      type="file"
      multiple={false}
      onChange={(e) =>
        field.onChange(e.target.files ? e.target.files[0] : null)
      }
      className="hover:cursor-pointer"
    />
  )
}
