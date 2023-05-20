import { Link } from 'react-router-dom'

import { PieChart } from '@/shared/ui'
import { useDetails } from './useDetails'

export const DetailsPage = () => {
  const { factoryId, factoryData } = useDetails()

  return (
    <>
      <section className="max-w-lg m-auto">
        <Link to="/">Back</Link>
        <h1>Statistics for factory {factoryId}</h1>
        <PieChart data={factoryData} />
      </section>
    </>
  )
}
