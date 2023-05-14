import { Request, Response } from 'express';
import { Model, model } from '../models/model'

class Controller {
	private _model: Model

	constructor(model: Model) {
		this._model = model;
	}

	async getData(_: Request, res: Response) {
		res.send(await this._model.getData())
	}
}

const controller = new Controller(model)
export { Controller, controller }