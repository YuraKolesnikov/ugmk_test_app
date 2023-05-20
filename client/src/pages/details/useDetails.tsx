export function useDetails() {
  const factoryId = localStorage.getItem('factoryId')
  const factoryData: number[] = localStorage.getItem('factoryData')
    ? JSON.parse(localStorage.getItem('factoryData')!)
    : []

  return { factoryId, factoryData }
}
