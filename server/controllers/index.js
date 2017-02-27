const token = require('./token')
const doc = require('./doc')
const sentence = require('./sentence')
const { withTokenAuth } = require('../helpers/actor_module_mw')

module.exports = Object.assign(
  token,
  withTokenAuth(doc),
  withTokenAuth(sentence)
)
