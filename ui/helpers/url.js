const url = {
  dashboardPage () {
    return `/dashboard`
  },
  /**
   * @param {string} did - document id
   * @param {string} sid - sentence id
   */
  editPageOneMode (did, sid) {
    return `/dashboard/docs/${did}?view=one&s_id=${sid}`
  },
  editPageListMode (did) {
    return `/dashboard/docs/${did}?view=list`
  }
}

export default url
