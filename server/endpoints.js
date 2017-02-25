const sendfile = require('koa-sendfile')
const { join } = require('path')

const endpoints = {
  '/*': {
    GET: async (ctx) => {
      await sendfile(ctx, join(__dirname, '../public/index.html'))
    }
  }
}

module.exports = endpoints
