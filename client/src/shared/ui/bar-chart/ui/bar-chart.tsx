import { FC, useEffect, useRef } from 'react'
import {
  Chart,
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
  data: {
    label: string
    data: number[]
  }[]
  onBarClick: ({
    columnIndex,
    itemIndex,
  }: {
    columnIndex: number
    itemIndex: number
  }) => void
}

export const BarChart: FC<IBarChartProps> = ({ data, onBarClick }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let chartInstance: Chart | null = null
    if (chartRef && chartRef.current) {
      chartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: {
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
          datasets: data.map((item, index) => ({
            label: item.label,
            backgroundColor:
              index === 0 ? 'rgba(244, 92, 99,0.2)' : 'rgba(67, 101, 245,0.2)',
            borderColor:
              index === 0 ? 'rgba(244, 92, 99,1)' : 'rgba(67, 101, 245,1)',
            borderWidth: 2,
            hoverBackgroundColor:
              index === 0 ? 'rgba(244, 92, 99,0.4)' : 'rgba(67, 101, 245,0.4)',
            hoverBorderColor:
              index === 0 ? 'rgba(244, 92, 99,1)' : 'rgba(67, 101, 245,1)',
            data: item.data,
          })),
        },
        options: {
          onClick: (_, activeElements) => {
            if (!!activeElements.length) {
              const { datasetIndex: columnIndex, index: itemIndex } =
                activeElements[0]
              onBarClick({ columnIndex, itemIndex })
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
            },
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
        },
      })
    }
    return () => {
      if (!!chartInstance) {
        chartInstance.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}
