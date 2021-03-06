import config from './_config'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import winston from 'winston-color'
import favicon from 'serve-favicon'
import httpervert from 'httpervert'
import path from 'path'
import getRouter from './routes'
import session from 'express-session'

const _parentDir = require(path.join(path.dirname(__dirname), 'package.json'))
const _bootstrapDir = require.resolve('bootstrap').match(/.*\/node_modules\/[^/]+\//)[0]

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logger: winston,
  config: config,
  packageDir: _parentDir,
  shintechServerpsql: process.env.SHINTECH_SERVER_PSQL,
  shintechServermysql: process.env.SHINTECH_SERVER_MYSQL
}

const { app, environment } = options
const RedisStore = require('connect-redis')(session)
const store = new RedisStore({
  url: config.redisStore.url
})

app.use(session({
  store: store,
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))

options.redis = store

app.use(helmet())

const server = httpervert(options)
const router = getRouter(options)

app.use(favicon(path.join(__dirname, 'resources', 'images', 'favicon.png')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/css', express.static(path.join(_bootstrapDir, 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'static')))

if (environment !== 'test') {
  app.use(morgan('dev'))
}

app.use('/api', router)

const serverConfig = {
  server: server,
  options: options
}

export default serverConfig
