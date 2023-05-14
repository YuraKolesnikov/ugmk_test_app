import { PRODUCTS } from '@/shared/config/const'
import { Select } from '@/shared/ui'
import { useState } from 'react'

export const HomePage = () => {
  const [selectedProduct, onSelectProduct] = useState('')

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
    </section>
  )
}
