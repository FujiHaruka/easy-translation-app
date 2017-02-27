const assert = require('assert')
const mongoose = require('mongoose')
const { url } = require('../../env')
const models = require('../../server/models')
const {
  Token,
  User
} = models
const calcPasswordHash = require('../../server/helpers/calc_password_hash')
const tokenCtrl = require('../../server/controllers/token')

describe('token controller', function () {
  let userKey = 'demo'
  let password = 'demo'

  before(async () => {
    mongoose.connect(url.MONGO)
    await Token.remove({}).exec()
    await User.remove({}).exec()

    let passwordHash = calcPasswordHash(password)
    await User({ userKey, passwordHash }).save()
  })

  after(async () => {
    mongoose.disconnect()
  })

  it('funcs', async () => {
    let tokenInfo = await tokenCtrl.requestToken({ userKey, password })
    assert.ok(tokenInfo.token)
    assert.equal(tokenInfo.userKey, userKey)

    {
      let { ok } = await tokenCtrl.validateToken(tokenInfo)
      assert.ok(ok)
    }

    {
      await tokenCtrl.deleteToken(tokenInfo)
      let { ok } = tokenCtrl.validateToken(tokenInfo)
      assert.ok(!ok)
    }
  })
})

/* global describe before after it */
