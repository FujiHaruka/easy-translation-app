/**
 * Actor module middlewares
 */
const { validateToken } = require('../controllers/token')

const withTokenAuth = (controller) => {
  let controllerWithAuth = {}
  for (let funcName of Object.keys(controller)) {
    let func = controller[funcName]
    let funcWithAuth = async (arg) => {
      let { userKey, token } = arg
      let vRes = await validateToken({ userKey, token, safe: false })
      if (vRes.err) {
        return vRes
      }
      let res = await func(arg)
      return res
    }
    controllerWithAuth[funcName] = funcWithAuth
  }
  return controllerWithAuth
}

module.exports = {
  withTokenAuth
}
