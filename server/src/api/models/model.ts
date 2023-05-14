class Model {
  async getData() {
    return { ping: 'pong' }
  }
}

const model = new Model()

export { Model, model }
