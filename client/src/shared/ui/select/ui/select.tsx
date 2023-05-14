import { Product } from '@/shared/config/const'
import { FC, Dispatch, SetStateAction } from 'react'

interface ISelectProps {
  id: string
  name: string
  value: string
  onChange: Dispatch<SetStateAction<string>>
  options: Product[]
}

export const Select: FC<ISelectProps> = ({
  id,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <select
      id={id}
      name={name}
      onChange={({ currentTarget: { value } }) => onChange(value)}
    >
      {options.map(o => (
        <option key={o.id} value={o.id} selected={value === o.id}>
          {o.title}
        </option>
      ))}
    </select>
  )
}
