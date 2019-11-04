/**
 * @description 存储配置
 * @author hayho
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
let conf = {
  host,
  dialect: 'mysql'
}

if (isTest) {
  conf.logging = () => {}
}

// 线上环境使用
if (isProd) {
  conf.pool = {
    max: 5,  // 连接池最大连接数量
    min: 0,  // 最小
    idle: 10000   //  10S内没有使用则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq

