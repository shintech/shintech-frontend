import url from 'url'
import got from 'got'

const queries = {}

export default function getAllRoutes (options) {
  const { shintechServermysql, logger } = options

  queries.fetchAllUsers = (req, res, next) => {
    let address = url.resolve(shintechServermysql, '/api/users')
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

  queries.fetchSingleUser = (req, res, next) => {
    const userID = parseInt(req.params.id)

    let address = url.resolve(shintechServermysql, '/api/users/' + userID)
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
