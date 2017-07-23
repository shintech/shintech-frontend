import url from 'url'
import got from 'got'

const queries = {}

export default function getAllRoutes (options) {
  const { serverAddress } = options

  queries.fetchAllModels = (req, res, next) => {
    let address = url.resolve(serverAddress, '/api/models')
    res.setHeader('Content-Type', 'application/json')
    got.stream(address).pipe(res)
  }

  return queries
}
