/**
 * @description json schema 校验
 */

const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true    // 输出所有错误 速度慢
})

/**
 * 
 * @param {object} schema 规则
 * @param {object} data 数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema,data)
  if (!valid) {
    console.log(ajv.errors)
    return ajv.errors[0]
  }
}

module.exports = validate



