const env = (name, dev) => process.env[`ETA_${name}`] || dev

module.exports = {
  port: {
    APP: env('APP', 3000)
  }
}
