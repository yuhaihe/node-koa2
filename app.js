const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./src/conf/db')
const { isProd } = require('./src/utils/env')
// 路由
const errorViewRouter = require('./src/routes/views/error')
const index = require('./src/routes/index')
const users = require('./src/routes/users')

// error handler
let onerrorConfig = {}
if (isProd) {
  onerrorConfig = {
    redirect: '/error'
  }
}
onerror(app, onerrorConfig)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/src/public'))

app.use(views(__dirname + '/src/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = ['Hayho+_*&^%']
app.use(session({
  key: 'weibo.sid',  // cookie name  默认 koa.sid
  prefix: 'weibo:sess:',  // redis key 前缀。默认koa:sess:
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,  // ms
  },
  // ttl: 24 * 60 * 60 * 1000,
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
