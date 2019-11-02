const { User, Blogs } = require('./model')

!(async () => {
    // const deleteBlogRes = await Blogs.destroy({
    //     where: {
    //         id: 1
    //     }
    // })
    // console.log('deleteBlogRes', deleteBlogRes > 0)

    // 删除用户
    const deleteUserRes = await User.destroy({
        where: {
            id: 2
        }
    })
    console.log('deleteUserRes', deleteUserRes > 0)
})()