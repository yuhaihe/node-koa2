/**
 * @description 微博 @ 关系 controller
 * @author hayho
 */

const { getAtReleationCount, getAtUserBlogList } = require('../services/at-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constants')
/**
 * 获取@我的数量
 * @param {number} userId 用户id
 */
async function getAtMeCount(userId) {
  const count = await getAtReleationCount(userId)
  return new SuccessModel({count})
}

/**
 * 获取@用户的微博列表
 * @param {number} userId userid
 * @param {number} pageIndex 页码
 */
async function getAtMeBlogList (userId, pageIndex = 0) {
  const result = await getAtUserBlogList(userId, pageIndex, PAGE_SIZE)
  const { blogList, count } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList
}