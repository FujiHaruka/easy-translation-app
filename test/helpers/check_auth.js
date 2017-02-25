const assert = require('assert')
const mongoose = require('mongoose')
const { url } = require('../../env')
const models = require('../../server/models')
const {
  User
} = models
const calcPasswordHash = require('../../server/helpers/calc_password_hash')
const checkAuth = require('../../server/helpers/check_auth')

describe('checkAuth', function () {
  before(async () => {
    mongoose.connect(url.MONGO)
    await User.remove({}).exec()
  })

  after(async () => {
    mongoose.disconnect()
  })

  it('check', async () => {
    let userKey = 'demo'
    let password = 'demo'
    let passwordHash = calcPasswordHash(password)
    await User({ userKey, passwordHash }).save()

    let ok = await checkAuth({ userKey, password })
    assert.ok(ok)

    let invalidUsers = [{
      userKey: 'demo',
      password: 'a'
    }, {
      userKey: 'a',
      password: 'demo'
    }]
    for (let invalidUser of invalidUsers) {
      let ok = await checkAuth(invalidUser)
      assert.ok(!ok)
    }
  })
})

/* global describe before after it */
