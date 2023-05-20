import { getMonth, parse } from 'date-fns'

import { CSVData, readCSVFile } from '../../../db/db'

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

class Model {
  async getData() {
    const products: CSVData[] = await readCSVFile('products.csv')

    const factories: string[] = []

    const formatted = products
      .filter(item => !!item.date)
      .reduce((acc: MonthlyData[], curr: CSVData) => {
        const { date, factory_id, product1, product2, product3 } = curr
        const month: number = getMonth(parse(date, 'd/M/yyyy', new Date()))

        const monthIndex = acc.findIndex(item => item.month === month)
        const factoryId = `factory_${factory_id}`
        factories.push(factoryId)
        if (monthIndex < 0) {
          acc.push({
            month,
            factories: {
              [factoryId]: {
                product1: +product1,
                product2: +product2,
                product3: +product3,
                sum: +product1 + +product2 + +product3,
              },
            },
          })
        } else {
          const factoryData = acc[monthIndex].factories[factoryId]
          if (factoryData) {
            factoryData.product1 += +product1
            factoryData.product2 += +product2
            factoryData.product3 += +product3
            factoryData.sum += +product1 + +product2 + +product3
          } else {
            acc[monthIndex].factories[factoryId] = {
              product1: +product1,
              product2: +product2,
              product3: +product3,
              sum: +product1 + +product2 + +product3,
            }
          }
        }

        return acc
      }, [])
      .sort((a: MonthlyData, b: MonthlyData) => (a?.month > b?.month ? 1 : -1))

    return { products: formatted, factories: [...new Set(factories)] }
  }
}

const model = new Model()

export { Model, model }
