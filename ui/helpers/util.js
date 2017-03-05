import { browserHistory } from 'react-router'

export const pathTo = (path) => () => {
  browserHistory.push(path)
}
