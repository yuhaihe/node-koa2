/**
 * @description user api
 * @author hayho
 */
const router = require('koa-router')()
const { isExist, register, login, deleteCurUser, changeInfo, changePassword, logout } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidate } = require('../../middlewares/validate')
const { loginChecks } = require('../../middlewares/loginChecks')
const { isTest } = require('../../utils/env')
router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // controller
  ctx.body = await isExist(userName)
})

// 注册
router.post('/register', genValidate(userValidate), async (ctx, next) => {
  const { userName, password, genderen } = ctx.request.body
  ctx.body = await register({ userName, password, genderen })
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 删除用户
router.post('/delete', loginChecks, async (ctx, next) => {
  if (isTest) {
    // 测试环境下登录后删除自己账号
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})

// 修改用户信息
router.patch('/changeInfo', loginChecks, genValidate(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

// 修改用户密码
router.patch('/changePassword', loginChecks, genValidate(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登录
router.post('/logout', loginChecks, genValidate(userValidate), async (ctx, next) => {
  ctx.body = await logout(ctx)
})

module.exports = router