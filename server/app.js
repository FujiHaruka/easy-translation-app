const Server = require('sugo-hub')
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

console.log(`Server listening on port ${port.APP}`)
server.listen(port.APP)
      .catch(e => { console.error(e) })
