/**
 * @description 微博 @ 关系 controller
 * @author hayho
 */

const { getAtReleationCount } = require('../services/at-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
 * 获取@我的数量
 * @param {number} userId 用户id
 */
async function getAtMeCount(userId) {
  const count = await getAtReleationCount(userId)
  return new SuccessModel({count})
}

module.exports = {
  getAtMeCount
}