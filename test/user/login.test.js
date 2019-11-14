/**
 * @description user api test
 * @author hayho
 */

const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName, 
  password,
  nickName: userName,
  gender: 1
}

// 存储cookie
let COOKIE = ''

// 注册
test('用户注册，应该成功', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).toBe(0)
})

// 重复注册
test('用户注册，应该失败', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询用户注册名，应该存在', async () => {
  const res = await server.post('/api/user/isExist').send({userName})
  expect(res.body.errno).toBe(0)
})

// json schema检查
test('非法注册，应该失败', async () => {
  const res = await server.post('/api/user/register')
    .send({
      userName: '123',
      password: '123',
      gender: 2
    })
  expect(res.body.errno).not.toBe(0)
})

// 登录验证
test('登录验证，应该成功', async () => {
  const res = await server.post('/api/user/login').send({userName,password})
  expect(res.body.errno).not.toBe(0)
})