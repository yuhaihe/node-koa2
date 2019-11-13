/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 已存在
  } else {
    // 不存在
  }

  // 统一返回格式

}

module.exports = {
  isExist
}