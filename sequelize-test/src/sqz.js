const Sequelize = require('sequelize');

const conf = {
  host: '49.233.92.122',
  dialect: 'mysql'
}

// 线上环境使用
// conf.pool = {
//   max: 5,  // 连接池最大连接数量
//   min: 0,  // 最小
//   idle: 10000   //  10S内没有使用则释放
// }

const seq = new Sequelize('koa2', 'admin_remote', 'BKv^Q%TjCj%8M#HW', conf);

module.exports = seq;

