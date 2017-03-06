import assert from 'assert'

const url = {
  dashboardPage () {
    return `/dashboard`
  },
  /**
   * @param {string} did - document id
   * @param {string} sid - sentence id
   */
  docPageOnEdit (did, sid) {
    assert.ok(did)
    assert.ok(sid)
    return `/dashboard/docs/${did}?mode=edit&sid=${sid}`
  },
  docPageOnListView (did) {
    assert.ok(did)
    return `/dashboard/docs/${did}?mode=view_list`
  },
  docPageOnParallelView (did) {
    assert.ok(did)
    return `/dashboard/docs/${did}?mode=view_parallel`
  }
}

export default url
