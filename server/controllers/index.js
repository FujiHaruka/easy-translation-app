const token = require('./token')
const doc = require('./doc')
const { withTokenAuth } = require('../helpers/actor_module_mw')

module.exports = Object.assign(
  token,
  withTokenAuth(doc)
)
