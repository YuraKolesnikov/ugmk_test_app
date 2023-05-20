import { createStore, type Reducer, type AnyAction } from 'redux'

import { MonthlyData } from './pages/home/types'

export interface RootState {
  data: MonthlyData[]
  factories: string[]
  factoryId: string
  factoryData: number[]
}

const initialState: RootState = {
  data: [],
  factories: [],
  factoryId: '',
  factoryData: [],
}

const SET_DATA = 'SET_DATA'
const SET_FACTORIES = 'SET_FACTORIES'
const SET_FACTORY_ID = 'SET_FACTORY_ID'
const SET_FACTORY_DATA = 'SET_FACTORY_DATA'

const rootReducer: Reducer<RootState, AnyAction> = (
  state = initialState,
  action,
) => {
  const { type, payload } = action
  switch (type) {
    case SET_DATA:
      return { ...state, data: [...payload] }
    case SET_FACTORIES:
      return { ...state, factories: [...payload] }
    case SET_FACTORY_ID:
      return { ...state, factoryId: payload }
    case SET_FACTORY_DATA:
      return { ...state, factoryData: [...payload] }
    default:
      return state
  }
}

export const setData = payload => ({
  type: SET_DATA,
  payload,
})

export const setFactories = payload => ({
  type: SET_FACTORIES,
  payload,
})

export const setFactoryId = payload => ({
  type: SET_FACTORY_ID,
  payload,
})

export const setFactoryData = payload => ({
  type: SET_FACTORY_DATA,
  payload,
})

export const store = createStore(rootReducer)
