export interface FactoryData {
  product1: number
  product2: number
  product3: number
  sum: number
}

export interface MonthlyData {
  month: number
  factories: { [factoryKey: string]: FactoryData }
}
