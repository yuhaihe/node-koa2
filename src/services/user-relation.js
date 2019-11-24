/**
 * @description 用户关系 services
 */

const { User, UserRelation } = require('../db/model/index')

/**
 * 获取关注该用户的用户列表，即粉丝
 * @param {number} followerId 被关注人id
*/
async function getUsersByFollower(followerId) {

}

module.exports = {
  getUsersByFollower
}