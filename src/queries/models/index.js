import url from 'url'
import got from 'got'

const queries = {}

export default function getAllRoutes (options) {
  const { shintechServerpsql, logger, redis } = options

  queries.fetchAllModels = (req, res, next) => {
    let address
    let page = 1

    if (req.query.page) {
      address = url.resolve(shintechServerpsql, '/api/models?page=' + req.query.page)
      page = req.query.page
    } else {
      address = url.resolve(shintechServerpsql, '/api/models')
    }

    res.setHeader('Content-Type', 'application/json')
    let stream = got.stream(address)
    let body = []

    stream.on('error', err => {
      let error = {
        error: err,
        message: `${req.method} - ${req.originalUrl} => error getting page ${page}...`
      }

      logger.error(error)

      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500

      res.json(error)
    })

    stream.on('data', (result) => {
      body.push(result)
    })

    stream.on('end', () => {
      redis.client.setex('data', 3600, body.toString())
    })
    stream.pipe(res)
  }

  queries.fetchSingleModel = (req, res, next) => {
    const modelID = parseInt(req.params.id)

    let address = url.resolve(shintechServerpsql, '/api/models/' + modelID)

    res.setHeader('Content-Type', 'application/json')

    let stream = got.stream(address)
    stream.pipe(res)

    stream.on('error', err => {
      let error = {
        error: err,
        message: `${req.method} - ${req.originalUrl} => error getting single model...`
      }

      logger.error(error)

      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500

      res.json(error)
    })
  }

  queries.createModel = (req, res, next) => {
    let address = url.resolve(shintechServerpsql, '/api/models')

    got.post(address, {
      json: true,
      body: {
        name: req.body.name,
        attribute: req.body.attribute
      }
    })
    .then(function () {
      res.json({
        status: 'success',
        message: 'successfully created one model...'
      })
    })
    .catch(function (err) {
      let error = {
        status: 'failure',
        error: err,
        message: `${req.method} - ${req.originalUrl} => error creating model...`
      }

      logger.error(error)

      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500

      res.json(error)
    })
  }

  queries.updateModel = (req, res, next) => {
    const modelID = parseInt(req.params.id)

    let address = url.resolve(shintechServerpsql, '/api/models/' + modelID)

    got.put(address, {
      json: true,
      body: {
        name: req.body.name,
        attribute: req.body.attribute
      }
    })
    .then(function () {
      res.json({
        status: 'success',
        message: 'successfully updated one model...'
      })
    })
    .catch(function (err) {
      let error = {
        error: err,
        message: `${req.method} - ${req.originalUrl} => error updating model...`
      }

      logger.error(error)

      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500

      res.json(error)
    })
  }

  queries.removeModel = (req, res, next) => {
    const modelID = parseInt(req.params.id)

    let address = url.resolve(shintechServerpsql, '/api/models/' + modelID)

    got.delete(address)
    .then(function () {
      res.json({
        status: 'success',
        message: 'successfully deleted one model...'
      })
    })
    .catch(function (err) {
      let error = {
        error: err,
        message: `${req.method} - ${req.originalUrl} => error deleting model...`
      }

      logger.error(error)

      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500

      res.json(error)
    })
  }

  return queries
}
