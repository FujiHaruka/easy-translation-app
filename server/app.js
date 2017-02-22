const Server = require('sg-server')
const sendfile = require('koa-sendfile')
const { port } = require('../env')
const { join } = require('path')
const co = require('co')

let server = Server({
  static: [ join(__dirname, '../public') ],
  endpoints: {
    '/*': {
      GET: (ctx) => co(function * () {
        yield sendfile(ctx, join(__dirname, '../public/index.html'))
      })
    }
  }
})

server.listen(port.APP)
