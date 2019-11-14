/**
 * @description user api
 * @author hayho
 */
const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidate } = require('../../middlewares/validate')
router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // controller
  ctx.body = await isExist(userName)
})

// 注册
router.post('/register', genValidate(userValidate), async (ctx, next) => {
  const { userName, password, genderen } = ctx.request.body

  // 调用controller
  ctx.body = await register({ userName, password, genderen })
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

module.exports = router