/**
 * @description 微博首页test
 * @author hayho
 */

const server = require('../server')
const { Z_COOKIE } = require('../testUserInfo')

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
    .set('cookie', Z_COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    BLOG_ID = res.body.data.id
})

test('删除微博，应该成功', async () => {
  const res = await server.post('/api/blog/delete')
  .send({id: BLOG_ID}).set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)
})

test('首页加载第一页数据，应该成功', async () => {
  const res = await server.get(`/api/blog/loadMore/0`).set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})