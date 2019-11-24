/**
 * @description 微博首页路由
 * @author hayho
 */

const router = require('koa-router')()
const { loginChecks } = require('../../middlewares/loginChecks')
const { create, deleteCurBlog } = require('../../controller/blog-home')
const blogValidator = require('../../validator/blog')
const { genValidate } = require('../../middlewares/validate')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginChecks, genValidate(blogValidator), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({userId,content, image})
})

// 删除微博，仅测试用
router.post('/delete', loginChecks, async (ctx, next) => {
  const { id } = ctx.request.body
  ctx.body = await deleteCurBlog(id)
})

module.exports = router