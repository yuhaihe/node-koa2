/**
 * @description blog-home controller
 */

const { createBlog, deleteBlog, getFollowersBlogList } = require('../services/blog')
const { getUserInfo } = require('../services/user')
const { createAtReleation } = require('../services/at-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo, deleteBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constants')
const xss = require('xss')

/**
 * 创建微博
 * @param {object} param0 
 */
async function create({ userId, content, image }) {
  // 分析并收集 content 中的 @ 用户
  // content 如 hello @李四 - lisi 你好 @ 王五 - wangwu
  const atUserNameList = []
  content = content.replace(REG_FOR_AT_WHO, function (matchStr, nickName, userName) {
    atUserNameList.push(userName)
    return matchStr
  })

  // 根据 @ 用户名查询用户信息
  const atUserList = await Promise.all(
    atUserNameList.map(userName => getUserInfo(userName))
  )

  // 根据用户信息，获取用户ID
  const atUserIdList = atUserList.map(user => user.id)
  // 根据用户id, 数据插入AtRealation表

  try {
    // 创建微博
    const blog = await createBlog({ userId, content: xss(content), image })

    // 创建 @ 关系
    await Promise.all(atUserIdList.map(
      userId => createAtReleation(blog.id, userId)
    ))

    return new SuccessModel(blog)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 删除微博
 * @param {number} id 微博id
 */
async function deleteCurBlog(id) {
  const result = await deleteBlog(id)
  if (result) {
    return new SuccessModel()
  }

  return new ErrorModel(deleteBlogFailInfo)
}

/**
 * 获取首页微博列表
 * @param {number} userId userId
 * @param {number} pageIndex page index
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({
    userId,
    pageIndex,
    PAGE_SIZE
  })
  const { count, blogList } = result
  // 返回
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = {
  create, deleteCurBlog, getHomeBlogList
}