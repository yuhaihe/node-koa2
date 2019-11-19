/**
 * @description blog service
 */
const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')
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
async function getBlogListByUser({userName, pageIndex=1, pageSize=5}) {
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

module.exports = {
  createBlog, getBlogListByUser, deleteBlog
}