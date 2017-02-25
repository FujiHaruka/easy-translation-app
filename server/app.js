const Hub = require('sugo-hub')
const Actor = require('sugo-actor')
const { port } = require('../env')
const { join } = require('path')
const actorModule = require('./actor_module')
const endpoints = require('./endpoints')
const mongoose = require('mongoose')
const { url } = require('../env')

let server = Hub({
  static: [ join(__dirname, '../public') ],
  endpoints,
  localActors: {
    'actor': Actor(actorModule)
  },
  storage: {
    redis: {
      url: url.REDIS
    }
  }
})

mongoose.set('debug', true)
mongoose.connect(url.MONGO)

console.log(`Server listening on port ${port.APP}`)
server.listen(port.APP)
      .catch(e => { console.error(e) })
