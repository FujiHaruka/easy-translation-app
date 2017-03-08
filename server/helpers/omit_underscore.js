/**
 * Mongo DB から取ったデータから _id などを除去する
 */
function omitUnderscore (data) {
  let obj = data.toObject()
  let keys = Object.keys(obj).filter(key => !key.startsWith('_'))
  let omitted = keys.reduce(
    (omitted, key) => Object.assign(omitted, { [key]: obj[key] }),
    {}
  )
  return omitted
}

module.exports = omitUnderscore
