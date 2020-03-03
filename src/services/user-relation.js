/**
 * @description 用户关系 services
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize= require('sequelize')
/**
 * 获取关注该用户的用户列表，即粉丝
 * @param {number} followerId 被关注人id
*/
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          userId: {
            [Sequelize.Op.ne] : followerId
          }
        }
      }
    ]
  })
  // result.count 总数
  // result.rows 查询结果，数组

  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)
  return {
    count: result.count,
    userList
  }
}

/**
 * 获取关注人列表
 * @param {number} userId 关注人id
*/
async function getFollowerByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [{
      model: User,
      attributes: ['id', 'userName', 'nickName', 'picture']
    }],
    where: {
      userId,
      followerId: {
        [Sequelize.Op.ne] : userId
      }
    }
  })

  let userList = result.rows.map(row => row.dataValues)
  userList = userList.map(item => {
    let user = item.user.dataValues
    user = formatUser(user)
    return user
  })
  return {
    count: result.count,
    userList
  }
}

/**
 * 添加用户id
 * @param {number} userId 用户id
 * @param {number} followerId 关注用户id
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId, followerId
  })
  return result.dataValues
}

/**
 * 删除关注关系
 * @param {number} userId 用户id
 * @param {number} followerId 关注用户id
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

module.exports = {
  getUsersByFollower,
  getFollowerByUser,
  addFollower,
  deleteFollower
}