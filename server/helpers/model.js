const mongoose = require('mongoose')

// Mongoose: mpromise (mongoose's default promise library) is deprecated
mongoose.Promise = global.Promise

/**
 * Create mongoose model
 * @param {string} name - model name
 * @param {Object} definition - schema definition
 * @return - mongoose model
 */
function Model (name, definition) {
  let schema = new mongoose.Schema(definition, {
    timestamps: true,
    toObject: { getters: true }
  })
  let model = mongoose.model(name, schema)
  return model
}

module.exports = Model
