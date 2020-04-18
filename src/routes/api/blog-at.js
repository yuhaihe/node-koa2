/**
 * @description @ 我的 API
 */

const router = require('koa-router')()
router.prefix('/api/square')
const { loginChecks } = require('../../middlewares/loginChecks')
const { getAtMeBlogList } = require('../../controller/blog-at')
const { getBlogListStr } = require('../../utils/blog')
router.prefix('/api/atMe')

// 加载更多
router.get('/loadMore/:pageIndex', loginChecks, async (ctx) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const { id: userId } = ctx.session.userInfo
  const result = await getAtMeBlogList(userId, pageIndex)
  
  // 渲染html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router