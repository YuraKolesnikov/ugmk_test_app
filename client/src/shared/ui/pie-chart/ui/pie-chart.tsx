import { FC, useEffect, useRef } from 'react'
import { Chart, ArcElement, Legend, PieController } from 'chart.js'

Chart.register(ArcElement, Legend, PieController)

interface IPieChart {
  data: number[]
}

export const PieChart: FC<IPieChart> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let chartInstance: Chart<'pie', number[], string> | null = null
    if (chartRef.current) {
      chartInstance = new Chart(chartRef.current, {
        type: 'pie',
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
              align: 'center',
              labels: {
                boxWidth: 10,
              },
            },
          },
        },
        data: {
          labels: ['Product 1', 'Product 2', 'Product 3'],
          datasets: [
            {
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(67, 101, 245, 0.2)',
                'rgba(128, 189, 123, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(67, 101, 245, 1)',
                'rgba(128, 189, 123, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
      })
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}
