import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { PRODUCTS } from '@/shared/config/const'
import { BarChart, Select } from '@/shared/ui'

interface FactoryData {
  product1: number
  product2: number
  product3: number
  sum: number
}

interface MonthlyData {
  month: number
  factories: { [factoryKey: string]: FactoryData }
}

export const HomePage = () => {
  const [selectedProduct, onSelectProduct] = useState('')
  const [data, setData] = useState<MonthlyData[]>([])
  const [factories, setFactories] = useState<string[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8000/api/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(({ factories, products }) => {
        setData(products)
        setFactories(factories)
      })
  }, [])

  const filtered = useMemo(() => {
    const datasets: { label: string; data: number[] }[] = []
    Object.keys(factories).forEach((f: string) => {
      datasets.push({
        label: `Factory ${+f + 1}`,
        data: data.reduce((acc: number[], curr: MonthlyData) => {
          const keyToSelect: string = !!selectedProduct
            ? selectedProduct
            : 'sum'

          acc.push(curr.factories[factories[f]][keyToSelect])
          return acc
        }, []),
      })
    })
    return datasets
  }, [data, selectedProduct])

  useEffect(() => console.log(filtered), [filtered])

  const handleBarClick = useCallback(
    ({
      columnIndex,
      itemIndex,
    }: {
      columnIndex: number
      itemIndex: number
    }) => {
      const factoryIndex = columnIndex
      const monthIndex = itemIndex
      console.log(factories[factoryIndex])
      const factory = data[itemIndex].factories[factories[factoryIndex]]
      const factoryData = {
        product1: factory.product1,
        product2: factory.product2,
        product3: factory.product3,
      }
      console.log({ factoryData })
      navigate(`/details/${factoryIndex}/${monthIndex}`)
    },
    [factories, data],
  )

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
      <section className="max-w-4xl m-auto">
        <BarChart data={filtered} onBarClick={handleBarClick} />
      </section>
    </>
  )
}
