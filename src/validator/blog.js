/**
 * @description 微博格式校验
 */

const _validate = require('./_validate')

//  校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * 校验微博数据格式
 * @param {object} data 微博数据
 */
function blogValidate(data={}){
  return _validate(SCHEMA,data)
}

module.exports = blogValidate