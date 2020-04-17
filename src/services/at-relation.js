/**
 * @description @ 用户关系 service
 * @author hayho
 */
const { AtRelation, Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')
/**
  * 创建微博 @ 用户 关系
  * @param {number} blogId 微博id
  * @param {number} userId 用户id
  */
async function createAtReleation(blogId, userId) {
  const result = await AtRelation.create({
    userId,
    blogId
  })

  return result.dataValues
}

/**
 * 获取 @ 用户的微博数量 （未读的）
 * @param {number} userId userid
 */
async function getAtReleationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

/**
 * 获取 @ 用户的微博列表
 * @param {number} userId userid
 * @param {number} pageIndex page
 * @param {number} pageSize totals
 */
async function getAtUserBlogList(userId, pageIndex, pageSize = 10) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offSet: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      // @ 关系
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId
        }
      },
      // User
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createAtReleation,
  getAtReleationCount,
  getAtUserBlogList
}