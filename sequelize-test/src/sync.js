const seq = require('./sqz');

require('./model')

// test
seq.authenticate().then(() => {
  console.log('连接成功')
}).catch(e => {
  console.log(e)
})

// 执行同步 

seq.sync({ force: true }).then(() => {
  console.log('sync ok');
  process.exit();
})