module.exports = {
  // Module
  OK: { ok: true },
  ERR: (message) => ({ ok: false, err: { message } })
}
