import { Provider } from 'react-redux'

import { AppRouter } from './app/providers/router'
import { store } from './store'

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div className="app">
        <AppRouter />
      </div>
    </Provider>
  )
}

export default App
