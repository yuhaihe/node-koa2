const { User } = require('./model')

!(async () => {
    const updataRes = await User.update({
        nickName: '张三'   
    }, {
        where: {
            userName: 'zhangsan'
        }
    })
    console.log('updataRes', updataRes[0] > 0)

})()