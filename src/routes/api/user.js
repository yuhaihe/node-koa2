/**
 * @description user api
 * @author hayho
 */
const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')

// 注册
router.post('/register', async (ctx, next) => {

})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // controller
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {

})

module.exports = router