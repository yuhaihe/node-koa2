/**
 * @description 微博 @ 关系 test
 * @author hayho
 */

const server = require('../server')
const { Z_COOKIE, L_USER_NAME, L_COOKIE } = require('../testUserInfo')

let BLOG_ID
test('张三创建一条微博， @李四应该成功', async () => {
    const content = '单元测试自动创建的微博 @李四 - ' + L_USER_NAME
    const res = await server.post('/api/blog/create')
        .send({content})
        .set('cookie', Z_COOKIE)
    expect(res.body.errno).toBe(0)

    // 记录微博id
    BLOG_ID = res.body.data.id
})

test('获取李四的 @ 列表， 应该有张三', async () => {
    const res = await server.get('/api/atMe/loadMore/0').set('cookie', L_COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    const blogList = data.blogList
    const isHavaCurBlog = blogList.some(blog => blog.id = BLOG_ID)
    expect(isHavaCurBlog).toBe(true)
})