const env = (name, dev) => process.env[`ETA_${name}`] || dev

const port = {
  APP: env('APP_PORT', 3000),
  REDIS: env('REDIS_PORT', 6370),
  MONGO: env('MONGO_PORT', 27011)
}

const url = {
  REDIS: env('REDIS_URL', `redis://localhost:${port.REDIS}`),
  MONGO: env('MONGO_URL', `mongodb://localhost:${port.MONGO}/easy-translation-app`)
}

const Env = {
  port,
  url
}

module.exports = Env
