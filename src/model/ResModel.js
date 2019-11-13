/**
 * @description res 的数据模型
 */

/**
 * 基础模块
 */
class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}