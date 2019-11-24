/**
 * @description user model test
 * @author hayho
 */

const { User } = require('../../src/db/model/index')

test('User模型测试', () => {
  // build 会构建基于内存的user实例，不会连接数据库
  const user = User.build({
    userName: 'hayho',
    password: '123456',
    nickName: '是多少',
    gender: 3,
    picture: 'assd.png',
    city: '北京'
  })

  // 验证属性
  expect(user.userName).toBe('hayho')
  expect(user.password).toBe('123456')
  expect(user.nickName).toBe('是多少')
  expect(user.gender).toBe(3)
  expect(user.picture).toBe('assd.png')
  expect(user.city).toBe('北京')
})