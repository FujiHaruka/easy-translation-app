const assert = require('assert')
const co = require('co')
const mongoose = require('mongoose')
const { url } = require('../../env')
const models = require('../../server/models')
const {
  User
} = models
const calcPasswordHash = require('../../server/helpers/calc_password_hash')
const checkAuth = require('../../server/helpers/check_auth')

describe('checkAuth', function () {
  before(() => co(function * () {
    mongoose.connect(url.MONGO)
    yield User.remove({}).exec()
  }))

  after(() => co(function * () {
    mongoose.disconnect()
  }))

  it('check', () => co(function * () {
    let userKey = 'demo'
    let password = 'demo'
    let passwordHash = calcPasswordHash(password)
    yield User({ userKey, passwordHash }).save()

    let ok = yield checkAuth({ userKey, password })
    assert.ok(ok)

    let invalidUsers = [{
      userKey: 'demo',
      password: 'a'
    }, {
      userKey: 'a',
      password: 'demo'
    }]
    for (let invalidUser of invalidUsers) {
      let ok = yield checkAuth(invalidUser)
      assert.ok(!ok)
    }
  }))
})

/* global describe before after it */
