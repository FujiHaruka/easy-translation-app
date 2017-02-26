const Model = require('./helpers/model')

const indexed = {
  type: String,
  index: true,
  unique: true,
  required: true
}

/**
 * ユーザー
 */
const User = Model('user', {
  userKey: indexed,
  passwordHash: {
    type: String,
    required: true
  }
})

/**
 * アクセストークン
 */
const Token = Model('token', {
  token: indexed,
  userKey: {
    type: String,
    required: true
  },
  until: {
    type: Date,
    required: true
  }
})

/**
 * ユーザーごとの設定
 */
const Setting = Model('setting', {
  id: indexed,
  userKey: {
    type: String,
    index: true,
    unique: true,
    required: true
  }
})

/**
 * Document
 */
const Doc = Model('doc', {
  id: indexed,
  userKey: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Sentence belongs to Document
 */
const Sentence = Model('sentence', {
  id: indexed,
  did: { // Doc id
    type: String,
    required: true,
    index: true
  },
  order: { // Order number in the doc
    type: Number,
    required: true
  },
  original: {
    type: String,
    required: true
  },
  translated: {
    type: String,
    default: ''
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = {
  User,
  Token,
  Setting,
  Doc
}
