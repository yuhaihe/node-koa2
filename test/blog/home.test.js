/**
 * @description 微博首页test
 * @author hayho
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')

// 微博id
let BLOG_ID = ''

// 创建微博
test('创建微博,应该成功', async () => {
  const content = 'addffas'
  const image = 'sad.png'

  const res = await server.post('/api/blog/create')
    .send({
      content, image
    })
    .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    BLOG_ID = res.body.data.id
})

test('删除微博，应该成功', async () => {
  const res = await server.post('/api/blog/delete')
  .send({id: BLOG_ID}).set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})
