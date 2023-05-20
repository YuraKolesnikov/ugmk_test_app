import { Link } from 'react-router-dom'

import { PieChart } from '@/shared/ui'

export const DetailsPage = () => {
  const data = [60, 23, 0]
  return (
    <>
      <section className="max-w-lg m-auto">
        <Link to="/">Back</Link>
        <PieChart data={data} />
      </section>
    </>
  )
}
