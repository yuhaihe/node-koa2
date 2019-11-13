/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
const {  SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 已存在
    return new SuccessModel(userInfo)
    // { errno: 0, data: {...} }
  } else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }

  // 统一返回格式

}

module.exports = {
  isExist
}