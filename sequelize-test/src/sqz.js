const Sequelize = require('sequelize');

const seq = new Sequelize('koa2', 'admin_remote', 'BKv^Q%TjCj%8M#HW', {
  host: '49.233.92.122',
  dialect: 'mysql'
});

module.exports = seq;

