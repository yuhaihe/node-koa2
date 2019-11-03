/**
 * @description json test
 */

 const server = require('./server')

 test('json 接口返回数据格式正确', async () => {
     const res = await server.post('/login').send({
         userName: ''
     })
     expect(res.body).toEqual({
         a: 123
     })
     expect(res.body.a).toBe(123)
 })