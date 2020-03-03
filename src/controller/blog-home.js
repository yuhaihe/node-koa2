/**
 * @description blog-home controller
 */

const { createBlog, deleteBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo, deleteBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constants')
const xss = require('xss')

/**
 * 创建微博
 * @param {object} param0 
 */
async function create({ userId, content, image }) {
  try {
    // 创建微博
    const blog = await createBlog({ userId, content: xss(content), image })
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