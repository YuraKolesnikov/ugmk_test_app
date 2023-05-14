import { type ReactElement, type ReactNode, useMemo, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { HomePage } from '@/pages/home'
import { DetailsPage } from '@/pages/details'

interface IRouteInterface {
  path: string
  element: ReactNode
  children?: IRouteInterface[]
}

const RouterView = (): ReactElement | null => {
  const ROUTES: IRouteInterface[] = useMemo(
    () => [
      { path: '/', element: <HomePage /> },
      { path: '/details/:factoryId/:month', element: <DetailsPage /> },
      { path: '*', element: <HomePage /> },
    ],
    [],
  )

  return useRoutes(ROUTES)
}

export const AppRouter = (): ReactElement => (
  <Suspense fallback={<div>Loading....</div>}>
    <RouterView />
  </Suspense>
)
