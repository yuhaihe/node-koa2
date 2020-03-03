/**
 * @description 微博首页路由
 * @author hayho
 */

const router = require('koa-router')()
const { loginChecks } = require('../../middlewares/loginChecks')
const { create, deleteCurBlog, getHomeBlogList } = require('../../controller/blog-home')
const blogValidator = require('../../validator/blog')
const { genValidate } = require('../../middlewares/validate')
const { getBlogListStr } = require('../../utils/blog')
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

// 加载更多
router.get('/loadMore/:pageIndex', loginChecks, async (ctx) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const {id:userId} = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)
  
  // 渲染html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router