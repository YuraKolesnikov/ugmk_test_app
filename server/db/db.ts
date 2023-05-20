import fs from 'fs'
import csv from 'csv-parser'
import path from 'path'

export interface CSVData {
  id: string
  factory_id: string
  date: string
  product1: number
  product2: number
  product3: number
}

export function readCSVFile(filename: string): Promise<CSVData[]> {
  const results: CSVData[] = []

  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, filename))
      .pipe(csv())
      .on('data', (data: CSVData) => {
        results.push(data)
      })
      .on('end', () => {
        resolve(results)
      })
      .on('error', (error: Error) => {
        reject(error)
      })
  })
}
