/**
 * @description 个人主页 API
 */

const router = require('koa-router')()
router.prefix('/api/profile')
const { loginChecks } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
const { follow, unFollow } = require('../../controller/user-relation')
// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginChecks, async (ctx) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName,pageIndex)
  
  // 渲染html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

// 添加关注
router.post('/follow', loginChecks, async (ctx) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await follow(myUserId, curUserId)
})

// 取消关注
router.post('/unFollow', loginChecks, async (ctx) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await unFollow(myUserId, curUserId)
})

module.exports = router