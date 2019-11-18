/**
 * @description 微博数据模型
 * @author hayho
 */

/**
 * @description User数据模型
 */
const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    commit: '用户id'
  },
  content: {
    type: TEXT,
    allowNull: false,
    commit: '微博内容'
  },
  image: {
    type: STRING,
    commit: '图片地址'
  }
})

module.exports = Blog