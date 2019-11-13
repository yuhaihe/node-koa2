/**
 * @description 封装sequlize数据类型
 */

const Sequelize = require('sequelize')

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INT: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN
}