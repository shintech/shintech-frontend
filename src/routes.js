import express from 'express'
import {models, users} from './queries'

export default function getRouter (options) {
  const router = express.Router()

  const { redis, logger } = options

// Models

  router.use('/models', function (req, res, next) {
    if (req.method === 'GET') {
      redis.client.get('data', function (err, response) {
        if (err) {
          logger.error(err)
        }

        if (response !== null) {
          const json = JSON.parse(response)

          let reqPage

          if (!req.query.page) {
            reqPage = 1
          } else {
            reqPage = parseInt(req.query.page)
          }

          let currentPage = parseInt(json.pageData.currentPage)
          if (reqPage === currentPage) {
            logger.info('loading cache...')

            res.json(JSON.parse(response))
          } else {
            next()
          }
        } else {
          next()
        }
      })
    } else {
      next()
    }
  })

  router.route('/models')
    .get(models(options).fetchAllModels)
    .post(models(options).createModel)

  router.route('/models/:id')
    .get(models(options).fetchSingleModel)

  router.route('/users')
    .get(users(options).fetchAllUsers)

  router.route('/users/:id')
    .get(users(options).fetchSingleUser)

  return router
}
