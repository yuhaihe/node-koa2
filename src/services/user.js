/**
 * @description user services
 * @author hayho
 */

const { User } = require('../db/model/User')
const { formatUser } = require('./_format')
/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} passWord 密码
 */
async function getUserInfo(userName,passWord) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (passWord) {
    Object.assign(whereOpt, passWord)
  }

  // 查询
  const result = await User.findOne({
    attribute: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result == null) {
    // 未找到
    return result
  }

  // 格式化
  const formatResult = formatUser(result.dataValues)
  return formatResult
}

module.exports = {
  getUserInfo
}