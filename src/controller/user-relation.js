/**
 * @description 用户关系 controller
 * @author hayho
 */

const { getUsersByFollower, addFollower, deleteFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')
/**
 * 根据userid获取粉丝列表
 * @param {number} userId 用户id
 */
async function getFans(userId) {
  const { count, userList } = await getUsersByFollower(userId)
  return new SuccessModel({
    count, 
    fansList: userList
  })
}

/**
 * 关注
 * @param {number} myUserId 当前用户id
 * @param {number} curUserId 要关注的用户id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    console.log(error)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {number} myUserId 当前用户id
 * @param {number} curUserId 要关注的用户id
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
    
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  follow,
  unFollow
}