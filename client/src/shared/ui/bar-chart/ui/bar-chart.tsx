import { FC, useEffect, useMemo, useRef } from 'react'
import {
  Chart,
  ChartData,
  ChartOptions,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
} from 'chart.js'

Chart.register(LinearScale)
Chart.register(CategoryScale)
Chart.register(BarController)
Chart.register(BarElement)

interface IBarChartProps {
  onBarClick: ({
    columnIndex,
    itemIndex,
  }: {
    columnIndex: number
    itemIndex: number
  }) => void
}

export const BarChart: FC<IBarChartProps> = ({ onBarClick }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  const chartOptions = useMemo<ChartOptions>(
    () => ({
      onClick: (_, activeElements) => {
        if (!!activeElements.length) {
          const { datasetIndex: columnIndex, index: itemIndex } =
            activeElements[0]
          onBarClick({ columnIndex, itemIndex })
        }
      },
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          stacked: false,
          grid: {
            display: true,
            color: 'rgba(255,99,132,0.2)',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    }),
    [],
  )

  const chartData = useMemo<ChartData>(
    () => ({
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Dataset #1',
          backgroundColor: 'rgba(244, 92, 99,0.2)',
          borderColor: 'rgba(244, 92, 99,1)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(244, 92, 99,0.4)',
          hoverBorderColor: 'rgba(244, 92, 99,1)',
          data: [65, 59, 20, 81, 56, 55, 40, 20, 81, 56, 55, 15],
        },
        {
          label: 'Dataset #2',
          backgroundColor: 'rgba(67, 101, 245,0.2)',
          borderColor: 'rgba(67, 101, 245,1)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(67, 101, 245,0.4)',
          hoverBorderColor: 'rgba(67, 101, 245,1)',
          data: [40, 99, 57, 81, 56, 55, 40, 81, 56, 55, 40, 27],
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
          type: 'bar',
          data: chartData,
          options: chartOptions,
        })
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}
