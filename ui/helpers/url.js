import assert from 'assert'

const url = {
  dashboardPage () {
    return `/dashboard`
  },
  newDocPage () {
    return '/dashboard/docs/new'
  },
  /**
   * @param {string} did - document id
   * @param {string} sid - sentence id
   */
  sentencePage (did, sid) {
    assert.ok(did)
    assert.ok(sid)
    return `/dashboard/docs/${did}/${sid}`
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
