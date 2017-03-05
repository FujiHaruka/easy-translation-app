import { getState } from 'jumpstate'

export const getApi = () => {
  let state = getState()
  let { api } = state.caller
  if (!api) {
    throw new Error('API caller is not connected.')
  }
  return api
}
