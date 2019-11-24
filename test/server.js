/**
 * @description jest server
 * @author hayho
 */

const request = require('supertest')
const server = require('../app').callback()

module.exports = request(server)