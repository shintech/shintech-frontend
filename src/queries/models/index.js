import url from 'url'
import got from 'got'

const queries = {}

export default function getAllRoutes (options) {
  const { shintechServerpsql, logger } = options

  queries.fetchAllModels = (req, res, next) => {
    let address

    if (req.query.page) {
      address = url.resolve(shintechServerpsql, '/api/models?page=' + req.query.page)
    } else {
      address = url.resolve(shintechServerpsql, '/api/models')
    }

    res.setHeader('Content-Type', 'application/json')
    let stream = got.stream(address)
    stream.pipe(res)

    stream.on('error', err => {
      logger.error(err)
      res.send({
        'error': err
      })
    })
  }

  queries.fetchSingleModel = (req, res, next) => {
    const modelID = parseInt(req.params.id)

    let address = url.resolve(shintechServerpsql, '/api/models/' + modelID)
    console.log(address)
    res.setHeader('Content-Type', 'application/json')
    let stream = got.stream(address)
    stream.pipe(res)

    stream.on('error', err => {
      logger.error(err)
      res.send({
        'error': err
      })
    })
  }

  return queries
}
