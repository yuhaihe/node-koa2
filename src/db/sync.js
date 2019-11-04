/**
 * @description sequelize 同步数据库
 * @author hayho
 */

const seq = require('./sqz')

// require('./model')

// test
seq.authenticate().then(() => {
  console.log('connect ok')
}).catch(e => {
  console.log(e)
})

// 执行同步 
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})