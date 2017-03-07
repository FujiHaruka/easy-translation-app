const token = require('./token')
const doc = require('./doc')
const sentence = require('./sentence')
const setting = require('./setting')
const util = require('./util')
const { withTokenAuth } = require('../helpers/actor_module_mw')

module.exports = Object.assign(
  token,
  withTokenAuth(doc),
  withTokenAuth(sentence),
  withTokenAuth(setting),
  withTokenAuth(util)
)
