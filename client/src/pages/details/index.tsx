import { Link } from 'react-router-dom'

import { PieChart } from '@/shared/ui'

export const DetailsPage = () => {
  return (
    <>
      <section className="max-w-lg m-auto">
        <Link to="/">Назад</Link>
        <PieChart />
      </section>
    </>
  )
}
