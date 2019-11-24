/**
 * @description 个人主页 API
 */

const router = require('koa-router')()
router.prefix('/api/profile')
const { loginChecks } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginChecks, async (ctx) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName,pageIndex)
  
  // 渲染html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router