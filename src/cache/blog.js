/**
 * @description 微博缓存
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key前缀
const KEY_PREFIX = 'weibo:sequare:'

/**
 * 获取广场列表缓存
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getSquareCacheList(pageIndex, pageSize){
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  const cacheResult = await get(key) 
  if (cacheResult != null) {
    return cacheResult
  }

  // 没缓存，查询数据库
  const result = await getBlogListByUser({pageIndex,pageSize})
  // 设置缓存，过期时间一分钟
  set(key, result, 60)
  return result
}

module.exports = {
  getSquareCacheList
}