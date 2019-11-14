/**
 * @description jsno schema验证中间件
 * @author hayho
 */
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
/**
 * 
 * @param {function} validateFn  验证函数
 */
function genValidate(validateFn) {
  // 定义中间件函数
  async function valdate(ctx, next){
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证成功，继续
    await next()
  }
  return valdate
}

module.exports = {
  genValidate
}