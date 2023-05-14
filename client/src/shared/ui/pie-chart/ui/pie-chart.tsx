import { useEffect, useMemo, useRef } from 'react'
import {
  Chart,
  ChartData,
  ChartOptions,
  PieController,
  ArcElement,
  Legend,
} from 'chart.js'

Chart.register(ArcElement, PieController, Legend)

export const PieChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  const chartOptions = useMemo<ChartOptions>(
    () => ({
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
    }),
    [],
  )

  const chartData = useMemo<ChartData>(
    () => ({
      labels: ['Product 1', 'Product 2'],
      datasets: [
        {
          data: [30, 50, 20], // The values for the pie chart
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', // Color for Value 1
            'rgba(67, 101, 245, 0.2)', // Color for Value 2
            'rgba(128, 189, 123, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)', // Border color for Value 1
            'rgba(67, 101, 245, 1)', // Border color for Value 2
            'rgba(128, 189, 123, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }),
    [],
  )

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: chartData,
          options: chartOptions,
        })
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}
