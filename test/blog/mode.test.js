/**
 * @description 微博模型单元测试
 * @author hayho
 */

const { Blog } = require('../../src/db/model/index')

test('Blog模型测试', () => {
  // build 会构建基于内存的实例，不会连接数据库
  const blog = Blog.build({
    userId: 1,
    image: '12.png',
    content: '是多少'
  })

  // 验证属性
  expect(blog.userId).toBe(1)
  expect(blog.image).toBe('12.png')
  expect(blog.content).toBe('是多少')
})