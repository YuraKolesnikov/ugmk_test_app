import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

import { PRODUCTS } from '@/shared/config/const'
import { BarChart, Select } from '@/shared/ui'

export const HomePage = () => {
  const [selectedProduct, onSelectProduct] = useState('')
  const navigate = useNavigate()

  const handleBarClick = useCallback(
    ({
      columnIndex,
      itemIndex,
    }: {
      columnIndex: number
      itemIndex: number
    }) => {
      console.log({ columnIndex, itemIndex })
      navigate(`/details/${columnIndex}/${itemIndex}`)
    },
    [],
  )

  return (
    <>
      <section className="max-w-3xl m-auto mb-10 flex items-center justify-end border-black p-4">
        <Select
          id="product"
          name="product"
          label="Фильтр по типу продукции"
          value={selectedProduct}
          onChange={onSelectProduct}
          options={[{ id: '', title: 'All products' }, ...PRODUCTS]}
        />
      </section>
      <section className="max-w-4xl m-auto">
        <BarChart onBarClick={handleBarClick} />
      </section>
    </>
  )
}
