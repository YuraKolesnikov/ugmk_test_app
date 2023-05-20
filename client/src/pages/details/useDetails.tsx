import { useSelector } from 'react-redux'

import { RootState } from '@/store'

export function useDetails() {
  return useSelector((store: RootState) => {
    const { factoryId, factoryData } = store
    return { factoryId, factoryData }
  })
}
