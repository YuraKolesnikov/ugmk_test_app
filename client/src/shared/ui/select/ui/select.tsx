import { Product } from '@/shared/config/const'
import { FC, Dispatch, SetStateAction } from 'react'

interface ISelectProps {
  id: string
  name: string
  value: string
  label: string
  onChange: Dispatch<SetStateAction<string>>
  options: Product[]
}

export const Select: FC<ISelectProps> = ({
  id,
  name,
  value,
  label,
  onChange,
  options,
}) => {
  return (
    <fieldset className="w-4/5 flex items-center">
      <label className="mr-4" htmlFor={id}>
        {label}
      </label>
      <div className="flex-auto relative border border-gray-300 text-gray-800 bg-white shadow-lg cursor-pointer">
        <select
          id={id}
          name={name}
          onChange={({ currentTarget: { value } }) => onChange(value)}
          className="appearance-none w-full py-1 px-2 bg-white cursor-pointer"
        >
          {options.map(o => (
            <option key={o.id} value={o.id} selected={value === o.id}>
              {o.title}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l cursor-pointer">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </fieldset>
  )
}
