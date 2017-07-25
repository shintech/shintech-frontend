const config = {}

config.domainName = {
  development: 'dev.shintech.ninja',
  production: 'shintech.ninja'
}

config.redisStore = {
  url: process.env.REDIS_STORE_URI,
  secret: process.env.REDIS_STORE_SECRET
}

config.sslPath = '/etc/letsencrypt/live/'

export default config
