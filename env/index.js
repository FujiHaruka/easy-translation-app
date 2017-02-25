const env = (name, dev) => process.env[`ETA_${name}`] || dev

let test = process.env.NODE_ENV === 'test'

const port = {
  APP: env('APP_PORT', 3000),
  REDIS: env('REDIS_PORT', 6379),
  MONGO: env('MONGO_PORT', 27011)
}

const url = {
  REDIS: env('REDIS_URL', `redis://localhost:${port.REDIS}/12`),
  MONGO: env('MONGO_URL', `mongodb://localhost:${port.MONGO}/${test ? 'eta-test' : 'eta'}`)
}

const Env = {
  port,
  url
}

module.exports = Env
