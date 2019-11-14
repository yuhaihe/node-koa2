/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 已存在
    return new SuccessModel()
    // { errno: 0, data: {...} }
  } else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }

  // 统一返回格式

}

/**
 * 注册
 * @param {object} param0 用户名，密码，性别：1男2女3保密
 */
async function register({ userName, password, genderen }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  }

  // 实现注册功能
  try {
    await createUser({
      userName, 
      password: doCrypto(password),
      genderen
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.error, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 用户登录
 * @param {string} userName 账号
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }

  // success
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel(userInfo)
}

module.exports = {
  isExist, register,login
}