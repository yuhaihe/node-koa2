/**
 * @description blog-home controller
 */

const { createBlog, deleteBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo, deleteBlogFailInfo } = require('../model/ErrorInfo')
const xss = require('xss')

/**
 * 创建微博
 * @param {object} param0 
 */
async function create({ userId, content, image }) {
  try {
    // 创建微博
    const blog = await createBlog({userId, content: xss(content), image})
    return  new SuccessModel(blog)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 删除微博
 * @param {number} id 微博id
 */
async function deleteCurBlog(id){
  const result = await deleteBlog(id)
  if (result) {
    return new SuccessModel()
  }

  return new ErrorModel(deleteBlogFailInfo)
}

module.exports = {
  create, deleteCurBlog
}