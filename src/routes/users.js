const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../conf/constants')
const util = require('util')
const verify = util.promisify(jwt.verify)
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => {
  // 模拟登陆
  const { userName, password } = ctx.request.body
  let userInfo
  if (userName === 'zhangsan' && password === '123456') {
    userInfo = {
      userId: 1,
      userName: 'zhangsan',
      nickName: '张三'
    }
  }
  // 加密userInfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h'} )
  }

  if (userInfo == null) {
    ctx.body = {
      code: 1,
      msg: '登陆失败'
    }
    return
  }
  ctx.body = {
    code: 0,
    data: token
  }
})
// 获取用户信息
router.get('/getUserInfo', async ctx => {
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      code: 0,
      userInfo: payload
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: 1,
      msg: 'error'
    }
  }

})

module.exports = router
