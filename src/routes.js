import express from 'express'
import {models} from './queries'

export default function getRouter (options) {
  const router = express.Router()

// Models

  router.route('/models')
    .get(models(options).fetchAllModels)
    // .post(models(options).createModel)

  // router.route('/models/:id')
  //   .get(models(options).getSingleModel)
  //   .put(models(options).updateSingleModel)
  //   .delete(models(options).removeModel)

  return router
}
