const Server = require('sg-server')
const { port } = require('../env')
const { join } = require('path')

let server = Server({
  static: [ join(__dirname, '../public') ],
  endpoints: {}
})

server.listen(port.APP)
