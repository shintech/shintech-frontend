import url from 'url'
import got from 'got'

const queries = {}

export default function getAllRoutes (options) {
  const { serverAddress, logger } = options

  queries.fetchAllModels = (req, res, next) => {
    let address = url.resolve(serverAddress, '/api/models')
    res.setHeader('Content-Type', 'application/json')
    const stream = got.stream(address)
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
