const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const cors = require('koa2-cors') //跨域处理
// const jwtKoa = require('koa-jwt')

const { REDIS_CONF } = require('./src/conf/db')
const { isProd } = require('./src/utils/env')
const { SESSION_SCRECT_KEY } = require('./src/conf/screctKeys')
// 路由
const errorViewRouter = require('./src/routes/views/error')
const blogViewRouter = require('./src/routes/views/blog')
const userViewRouter = require('./src/routes/views/user')
const userAPIRouter = require('./src/routes/api/user')
const utilAPIRouter = require('./src/routes/api/utils')
const blogHomeAPIRouter = require('./src/routes/api/blog-home')
const profileAPIRouter = require('./src/routes/api/blog-profile')
const squareAPIRouter = require('./src/routes/api/blog-square')
const mock = require('./src/routes/mock/index')

// app.use(jwtKoa({
//   secret: SECRET
// }).unless({
//   path: [/^\/users\/login/]
// }))
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
app.use(cors())
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/src/public'))
app.use(koaStatic(path.join(__dirname, 'uploadFiles')))
app.use(views(__dirname + '/src/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SCRECT_KEY]
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

app.use(mock.routes(), mock.allowedMethods())
// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())

app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilAPIRouter.routes(), utilAPIRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods())
// 404路由放最后
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
