/**
 * @description blog service
 */
const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')
/**
 * 创建微博
 * @param {object} param0 
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId, content, image
  })

  return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {string} userName 
 * @param {number} pageIndex 
 */
async function getBlogListByUser({ userName, pageIndex = 1, pageSize = 5 }) {
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }

  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: (pageIndex - 1) * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })

  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList.map(item => {
    const user = item.user.dataValues
    item.user = formatUser(user)
    return item
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * 删除微博
 * @param {number} id 
 */
async function deleteBlog(id) {
  id = parseInt(id)
  const result = await Blog.destroy({
    where: {
      id
    }
  })
  return result > 0
}

/**
 * 获取关注者的微博列表（首页）
 * @param {object} 查询条件 
 * @param {number} pageIndex 
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId }
      }
    ]
  })

  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser,
  deleteBlog,
  getFollowersBlogList
}