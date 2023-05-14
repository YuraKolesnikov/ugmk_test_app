import { useEffect } from 'react'

const App = (): JSX.Element => {
  useEffect(() => {
    fetch('http://localhost:8000/api/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => console.log(res))

    fetch('http://localhost:8000/api/details/1/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }, [])

  return (
    <div className="app">
      <h1>Hello from React</h1>
    </div>
  )
}

export default App
