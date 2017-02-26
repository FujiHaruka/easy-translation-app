/**
 * Local actor module
 */
const { Module } = require('sugo-actor')
const controllers = require('./controllers')

const actorModule = new Module(controllers)

module.exports = actorModule
