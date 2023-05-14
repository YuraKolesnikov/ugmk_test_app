import express, { Router as ExpressRouter } from 'express'

import { Controller, controller } from '../controllers/controller'

class Router {
  private _controller: Controller
  private _router: ExpressRouter

  constructor(controller: Controller, router: ExpressRouter) {
    this._controller = controller
    this._router = router
    this.setupRouter()
  }

  get router(): ExpressRouter {
    return this._router
  }

  setupRouter() {
    this._router.route('/').get(this._controller.getData.bind(this._controller))
    this._router
      .route('/details/:factoryId/:month')
      .get(this._controller.getDetails.bind(this._controller))
  }
}

export const router = new Router(controller, express.Router()).router
