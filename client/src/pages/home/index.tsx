import { useCallback, useState } from 'react'
/* import { useNavigate } from 'react-router' */

import { PRODUCTS } from '@/shared/config/const'
import { BarChart, PieChart, Select } from '@/shared/ui'

export const HomePage = () => {
  const [selectedProduct, onSelectProduct] = useState('')
  /* const navigate = useNavigate() */

  const handleBarClick = useCallback(
    ({
      columnIndex,
      itemIndex,
    }: {
      columnIndex: number
      itemIndex: number
    }) => {
      console.log({ columnIndex, itemIndex })
    },
    [],
  )

  return (
    <section>
      <h1>Home page</h1>
      <p>Selected product: {selectedProduct}</p>
      <Select
        id="product"
        name="product"
        value={selectedProduct}
        onChange={onSelectProduct}
        options={[{ id: '', title: 'All products' }, ...PRODUCTS]}
      />
      <BarChart onBarClick={handleBarClick} />
      <PieChart />
    </section>
  )
}
