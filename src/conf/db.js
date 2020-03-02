/**
 * @description 存储配置
 * @author hayho
 */
const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: '49.233.92.122',
  user: 'admin_remote',
  password: '1AHS#~/xk2',
  port: '3306',
  database: 'koa2'
}

if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: '49.233.92.122'
  }

  MYSQL_CONF = {
    host: '49.233.92.122',
    user: 'admin_remote',
    password: 'BKv^Q%TjCj%8M#HW',
    port: '3306',
    database: 'koa2'
  }
}
module.exports = {
  REDIS_CONF, MYSQL_CONF
}