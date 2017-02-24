const sendfile = require('koa-sendfile')
const co = require('co')

const endpoints = {
  '/*': {
    GET: (ctx) => co(function * () {
      yield sendfile(ctx, join(__dirname, '../public/index.html'))
    })
  }
}

module.exports = endpoints
