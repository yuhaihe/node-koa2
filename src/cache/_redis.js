/**
 * @description 连接 redis 方法  get  set
 * @author  hayho
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')
const { REDIS_PASSWORD } = require('../conf/screctKeys')
const { isProd } = require('../utils/env')

let redis_conf = {
  host: REDIS_CONF.host,
  port: REDIS_CONF.port, 
}
if (isProd) {
  redis_conf.password = REDIS_PASSWORD
}
// 创建客户端
const redisClient = redis.createClient(redis_conf)

redisClient.on('error', err => {
  console.log('redis error', err)
})

/**
 * redis set
 * @param {string} key key 
 * @param {string} val val 
 * @param {number} timeout 过期时间，单位 s 
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key key 
 */
function get(key) {
  const promise = new Promise((resovle, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resovle(null)
        return
      }
      try {
        resovle(JSON.parse(val))
      } catch (error) {
        resovle(val)
      }
    })
  })
  return promise
}

module.exports = {
  set, get
}