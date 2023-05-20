import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import {
  RootState,
  setData,
  setFactories,
  setFactoryId,
  setFactoryData,
} from '@/store'

import { MonthlyData } from './types'

export function useData(selectedProduct) {
  const dispatch = useDispatch()

  const { data, factories } = useSelector((store: RootState) => {
    const { data, factories } = store
    return {
      data,
      factories,
    }
  })

  useEffect(() => {
    fetch('http://localhost:8000/api/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(({ factories, products }) => {
        dispatch(setData(products))
        dispatch(setFactories(factories))
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

      dispatch(setFactoryId(factories[factoryIndex]))
      dispatch(setFactoryData(factoryData))

      navigate(`/details/${factories[factoryIndex]}/${monthIndex + 1}`)
    },
    [factories, filtered],
  )

  return { filtered, handleBarClick }
}
