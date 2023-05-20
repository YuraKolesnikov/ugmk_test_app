import { useCallback, useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router'

import { MonthlyData } from './types'

export function useData(selectedProduct) {
  const [data, setData] = useState<MonthlyData[]>([])
  const [factories, setFactories] = useState<string[]>([])

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

  const navigate = useNavigate()

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

      const factory = data[itemIndex].factories[factories[factoryIndex]]
      const factoryData = [factory.product1, factory.product2, factory.product3]

      localStorage.setItem('factoryId', factories[factoryIndex])
      localStorage.setItem('factoryData', JSON.stringify(factoryData))

      navigate(`/details/${factoryIndex}/${monthIndex}`)
    },
    [factories, filtered],
  )

  return { filtered, handleBarClick }
}
