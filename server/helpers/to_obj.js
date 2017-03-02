/**
 * Mongo DB から取ったデータをそのまま送れないので、 Object 化する
 */
function toObj (instance) {
  // もっと良い方法ないかな
  return JSON.parse(JSON.stringify(instance))
}

module.exports = toObj
