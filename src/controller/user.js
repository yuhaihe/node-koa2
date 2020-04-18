/**
 * @description user controller
 */

const { getUserInfo, createUser, deleteUser, updateUser, updatePassword } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
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
  debugger
  // success
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel(userInfo)
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户信息
 * @param {object} ctx 
 * @param {object} param1 用户信息
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }

  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName })

  if (result) {
    Object.assign(ctx.session.userInfo, { nickName, city, picture })
    return new SuccessModel()
  }

  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param {object} param0 用户名，密码，新密码
 */
async function changePassword(userName, password, newPassword) {
  const result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    { userName, password: doCrypto(password) })
  if (result) {
    return new SuccessModel()
  }

  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {object} ctx 
 */
async function logout(ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist, register, login, deleteCurUser, changeInfo, changePassword, logout
}