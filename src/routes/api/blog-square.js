/**
 * @description 广场 API
 */

const router = require('koa-router')()
router.prefix('/api/square')
const { loginChecks } = require('../../middlewares/loginChecks')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')

// 加载更多
router.get('/loadMore/:pageIndex', loginChecks, async (ctx) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getSquareBlogList(pageIndex)
  
  // 渲染html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router