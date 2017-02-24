const assert = require('assert')
const co = require('co')
const mongoose = require('mongoose')
const { url } = require('../env')
const models = require('../server/models')
const {
  Token
} = models
const actorModule = require('../server/actor_module')

describe('actorModule', function () {
  before(() => co(function * () {
    mongoose.connect(url.MONGO)
    yield Token.remove({}).exec()
  }))

  after(() => co(function * () {
    mongoose.disconnect()
  }))

  it('token', () => co(function * () {
    let userKey = 'demo'
    let password = 'demo'
    let user = { userKey, password }

    let invalidUsers = [{
      userKey: 'demo',
      password: 'a'
    }, {
      userKey: 'a',
      password: 'demo'
    }]
    for (let invalidUser of invalidUsers) {
      let { token, err } = yield actorModule.requestToken(invalidUser)
      assert.ok(err)
      assert.ok(!token)
    }

    let invalidToken = 'hoge'
    let invalidRes = yield actorModule.validateToken({ userKey, token: invalidToken })
    assert.ok(invalidRes.err)
    assert.ok(!invalidRes.ok)

    let { token, until } = yield actorModule.requestToken(user)
    assert.ok(token)
    assert.ok(until)

    let { ok, err } = yield actorModule.validateToken({ userKey, token })
    assert.ok(ok)
    assert.ok(!err)
  }))
})

/* global describe before after it */
