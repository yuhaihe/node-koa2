/**
 * @description 加密
 * @author hayho
 */

const crypto = require('crypto')
const { CRYPTO_SCRECT_KEY } = require('../conf/screctKeys')

/**
 * md5加密
 * @param {string} content 明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SCRECT_KEY}`
  return _md5(str)
}

module.exports = doCrypto