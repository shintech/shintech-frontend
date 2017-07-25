import express from 'express'
import {models, users} from './queries'

export default function getRouter (options) {
  const router = express.Router()

// Models

  router.route('/models')
    .get(models(options).fetchAllModels)

  router.route('/models/:id')
    .get(models(options).fetchSingleModel)

  router.route('/users')
    .get(users(options).fetchAllUsers)

  router.route('/users/:id')
    .get(users(options).fetchSingleUser)

  return router
}
