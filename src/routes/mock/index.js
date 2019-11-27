/**
 * @description 模拟返回数据
 * @author hayho
 */

const router = require('koa-router')()

router.post('/json', async (ctx) => {
  ctx.body = {
    code: 0,
    data: {
      param: ctx.request.body,
      total: parseInt(Math.random() * 999),
      result: [{
        vehicleLicense: '鲁BS6150',
        vehicleSerialNo: 'CL2019200720896'
      }]
    },
    msg: 'success'
  }
})

router.post('/search', async (ctx) => {
  ctx.body = {
    code: 0,
    data: {
      param: ctx.request.body,
      total: parseInt(Math.random() * 999),
      result: [{
        value: Math.random() * 999999,
      }]
    },
    msg: 'success'
  }
})
module.exports = router