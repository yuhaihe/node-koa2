const { Blogs, User } = require('./model');

!(async () => {
    // 查询一条记录
//   const zhangsan = await User.findOne({
//       where: {
//           userName: 'zhangsan'
//       }
//   })
//   console.log('zhangsan', zhangsan.dataValues)

//   //   查询特定列
//   const zhangsanName = await User.findOne({
//     attributes: ['userName', 'nickName'],
//       where: {
//         userName: 'zhangsan'
//       }
//     })
//   console.log('zhangsanName', zhangsanName.dataValues)

    // 查询列表
    // const zhangsanBlogsList = await Blogs.findAll({
    //     where: {
    //         userId: 1
    //     },
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })
    // console.log('zhangsanBlogsList', zhangsanBlogsList.map(blog => {return blog.dataValues}))
    
    // 分页
    // const blogPageList = await Blogs.findAll({
    //     limit: 2, // 查询条数
    //     offset: 0,  //  跳过条数
    //     order: [
    //         ['id', 'desc']
    //     ]
    // })
    // console.log('blogPageList', blogPageList.map(blog => {return blog.dataValues}))

    // 总数
    // const blogListAndCount = await Blogs.findAndCountAll({
    //     limit: 2, // 查询条数
    //     offset: 0,  //  跳过条数
    //       order: [
    //         ['id', 'desc']
    //       ]
    // })
    // console.log('blogListAndCount', 
    //              blogListAndCount.count,
    //              blogListAndCount.rows.map(blog => {return blog.dataValues})
    // )

    // 连表查询
    // const blogListWithUser = await Blogs.findAndCountAll({
    //     order: [
    //         ['id', 'desc']
    //     ],
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['userName', 'nickName'],
    //             where: {
    //                 userName: 'zhangsan'
    //             }
    //         }
    //     ]
    // })
    // console.log('blogListWithUser', blogListWithUser.count,  
    //   blogListWithUser.rows.map(
    //       blog => {
    //           const blogVal = blog.dataValues
    //           blogVal.user = blogVal.user.dataValues
    //           return blogVal
    //         })
    // )

        // 连表查询2
        const userListWithBlogs = await User.findAndCountAll({
            attributes: ['userName', 'nickName'],
            include: [
                {
                    model: Blogs
                }
            ]
        })
        console.log('userListWithBlogs', userListWithBlogs.count,  
        userListWithBlogs.rows.map(
              user => {
                  const userVal = user.dataValues
                  userVal.blogs = userVal.blogs.map(blog => blog.dataValues)
                  return userVal
                })
        )
})()