const Sequelize = require('sequelize');
const seq = require('./sqz');

// 创建user模型, 数据表名为复数

const User = seq.define('user', {
  // id 自动创建，并且为主键，自增
  userName: {
    type: Sequelize.STRING,  // varchar(255)
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称'
  }
});

// 创建blog模型

const Blogs = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// 外键关联
Blogs.belongsTo(User, {
  // 创建外键key Blogs.userId   =>  users.id
  foreignKey: 'userId'
})
// console.log(User)
User.hasMany(Blogs, {
   // 创建外键key Blogs.userId   =>  users.id
   foreignKey: 'userId'
})
// Blogs.belongsTo(User)   // 自动关联
module.exports = {
  User, Blogs
};

