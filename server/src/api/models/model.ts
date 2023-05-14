class Model {
	async getData() {
		return { lol: 'ping-pong' }
	}
}

const model = new Model()

export { Model, model }