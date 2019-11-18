/**
 * @description 微博首页路由
 * @author hayho
 */

const router = require('koa-router')()
const { loginChecks } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
router.prefix('/api/blog')

// 创建微博
router.post('/create', loginChecks, async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({userId,content, image})
})

module.exports = router