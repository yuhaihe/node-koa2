/**
 * @description @ 用户关系 service
 * @author hayho
 */
const { AtRelation } = require('../db/model/index')

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

module.exports = {
  createAtReleation,
  getAtReleationCount
}