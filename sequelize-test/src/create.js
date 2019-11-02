const { Blogs, User } = require('./model');

!(async () => {

  // 创建用户
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123456',
    nickName: '张三'
  })
  const zhangsanId = zhangsan.dataValues.id
  console.log('zahangsan', zhangsan.dataValues)
  const lisi = await User.create({
    userName: 'lisi',
    password: '123456',
    nickName: '李四'
  })
  const lisiId = lisi.dataValues.id
  // insert into users (userName, `password`，nickName) values('zhangsan', '123456', '张三');

  // 创建博客
  const blog = await Blogs.create({
    title: '123123',
    content: 'sadasadasd',
    userId: zhangsanId
  })
  console.log('blog', blog.dataValues)

  const blog3 = await Blogs.create({
    title: '123123',
    content: 'sadasadasd',
    userId: lisiId
  })

  const blog4 = await Blogs.create({
    title: '123123',
    content: 'sadasadasd',
    userId: lisiId
  })

})()
