/**
 * @description 登录验证中间件
 * @author hayho
 */
const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * 登录验证
 * @param {object} ctx 
 * @param {object} next 
 */
async function loginChecks(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo) 
}

/**
 * 页面登录验证
 * @param {object} ctx 
 * @param {object} next 
 */
async function loginRedirect(ctx,next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginChecks, loginRedirect
}