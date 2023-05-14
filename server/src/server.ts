import { app } from './app'

const createServer = async () => {
  try {
    const PORT = 8000
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

createServer()
