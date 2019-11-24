/**
 * @description 数据模型入口文件
 * @author hayho
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User, {
  foreignKey: 'userId',
  // targetKey: 'id'  // 管理user表的id字段，默认关联到主键
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

module.exports = {
  User, Blog, UserRelation
}