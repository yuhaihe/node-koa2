/**
 * @description 广场 controller
 */

const { PAGE_SIZE } = require('../conf/constants')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')
/**
 * 获取广场的微博列表
 * @param {number} pageIndex 页码
 */
async function getSquareBlogList(pageIndex = 1) {
  // cache
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList
  
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getSquareBlogList
}