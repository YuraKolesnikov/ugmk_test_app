import { useState } from 'react'

import { PRODUCTS } from '@/shared/config/const'
import { BarChart, Select } from '@/shared/ui'

import { useData } from './useData'

export const HomePage = () => {
  const [selectedProduct, onSelectProduct] = useState('')
  const { filtered, handleBarClick } = useData(selectedProduct)

  return (
    <>
      <section className="max-w-3xl m-auto mb-10 flex items-center justify-end border-black p-4">
        <Select
          id="product"
          name="product"
          label="Filter by product"
          value={selectedProduct}
          onChange={onSelectProduct}
          options={[{ id: '', title: 'All products' }, ...PRODUCTS]}
        />
      </section>
      <section className="max-w-4xl m-auto shadow-md shadow-slate-200">
        <BarChart data={filtered} onBarClick={handleBarClick} />
      </section>
    </>
  )
}
